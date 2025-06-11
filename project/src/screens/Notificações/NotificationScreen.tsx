import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BellRing, AlertTriangle, Trash2, ArrowLeftIcon } from "lucide-react";

interface Notification {
  title: string;
  description: string;
  type: "warning" | "alert";
}

export const NotificationScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const stompClientRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadScript = (src: string, onLoad: () => void) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = onLoad;
      document.body.appendChild(script);
      return script;
    };

    if (typeof (window as any).global === "undefined") {
      (window as any).global = window;
    }

    const sockjsScript = loadScript(
      "https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js",
      () => {
        const stompScript = loadScript(
          "https://cdn.jsdelivr.net/npm/stompjs@2.3.3/lib/stomp.min.js",
          () => {
            const SockJS = (window as any).SockJS;
            const Stomp = (window as any).Stomp;

            const socket = new SockJS("http://localhost:8080/ws");
            const client = Stomp.over(socket);
            client.debug = () => {};

            client.connect({}, () => {
              console.log("Conectado ao WebSocket para receber notificações.");
              stompClientRef.current = client;
              client.subscribe(
                "/topic/notifications",
                (message: { body: string }) => {
                  const newNotification: Notification = JSON.parse(
                    message.body
                  );
                  console.log("Nova notificação recebida:", newNotification);

                  setNotifications((prev) => [newNotification, ...prev]);
                }
              );
            });
          }
        );
        return () => {
          if (stompScript.parentNode) {
            stompScript.parentNode.removeChild(stompScript);
          }
        };
      }
    );

    return () => {
      if (stompClientRef.current?.connected) {
        stompClientRef.current.disconnect(() => {});
      }
      if (sockjsScript.parentNode) {
        sockjsScript.parentNode.removeChild(sockjsScript);
      }
    };
  }, []);

  const handleDeleteNotification = (indexToDelete: number) => {
    setNotifications((prev) =>
      prev.filter((_, index) => index !== indexToDelete)
    );
  };

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case "warning":
        return {
          icon: <BellRing className="h-6 w-6 text-yellow-600" />,
          bgColor: "bg-yellow-100",
          borderColor: "border-yellow-500",
        };
      case "alert":
        return {
          icon: <AlertTriangle className="h-6 w-6 text-red-600" />,
          bgColor: "bg-red-100",
          borderColor: "border-red-500",
        };
      default:
        return {
          icon: <BellRing className="h-6 w-6 text-gray-600" />,
          bgColor: "bg-gray-100",
          borderColor: "border-gray-500",
        };
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="relative flex items-center justify-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="absolute left-0 p-2 text-gray-600 hover:text-gray-800"
          aria-label="Voltar"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Notificações
        </h1>
      </div>
      <div className="space-y-4 max-w-2xl mx-auto">
        {notifications.length > 0 ? (
          notifications.map((notif, index) => {
            const style = getNotificationStyle(notif.type);
            return (
              <div
                key={index}
                className={`relative p-4 rounded-lg shadow-md border-l-4 ${style.bgColor} ${style.borderColor}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">{style.icon}</div>
                  <div>
                    <h2 className="font-bold text-lg text-gray-900">
                      {notif.title}
                    </h2>
                    <p className="text-gray-700">{notif.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteNotification(index)}
                  className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full"
                  aria-label="Excluir notificação"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 mt-12">
            Nenhuma notificação recebida ainda.
          </p>
        )}
      </div>
    </div>
  );
};
