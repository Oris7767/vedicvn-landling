import { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from '../contexts/ChatContext';
import {
  X,
  Send,
  Sparkles,
  QrCode,
  BookOpen,
  Calendar,
  CreditCard,
  Compass,
} from 'lucide-react';
import { DiyaIcon } from './icons/VedicIcons';

const API_URL = import.meta.env.VITE_VA_API_URL || 'https://va.vedicvn.sbs';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface QuickReply {
  id: string;
  label: string;
  value: string;
  icon: typeof BookOpen;
}

interface PaymentInfo {
  paymentCode: string;
  amount: number;
  qrUrl?: string;
  bankAccount?: string;
  bankName?: string;
  instructions?: string;
}

const QUICK_REPLIES: QuickReply[] = [
  {
    id: 'courses',
    label: 'Khóa học chiêm tinh',
    value: 'Tôi muốn tư vấn về các khóa học Chiêm Tinh Vệ Đà',
    icon: BookOpen,
  },
  {
    id: 'services',
    label: 'Gói tư vấn lá số',
    value: 'Cho tôi biết chi tiết các gói luận giải lá số',
    icon: Compass,
  },
  {
    id: 'booking',
    label: 'Đặt lịch với Trâm Phạm',
    value: 'Tôi muốn đặt lịch tư vấn 1-1 với Founder Trâm Phạm',
    icon: Calendar,
  },
  {
    id: 'price',
    label: 'Học phí & Lịch khai giảng',
    value: 'Khi nào có lớp mới khai giảng và học phí ra sao?',
    icon: CreditCard,
  },
];

function formatTime(date: Date): string {
  return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}

export function ChatWidget() {
  const { isOpen, pendingMessage, closeChat, openChat } = useChat();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasInitializedRef = useRef(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Initialize greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0 && !hasInitializedRef.current) {
      hasInitializedRef.current = true;
      const greeting: Message = {
        id: 'greeting',
        role: 'assistant',
        content:
          'Namaste! Mình là Carmen, trợ lý học vụ của Votive Academy (VedicVN).\n\nMình có thể hỗ trợ bạn:\n• Tư vấn lộ trình học Chiêm Tinh Vệ Đà (Jyotish)\n• Lựa chọn gói tư vấn lá số phù hợp\n• Hướng dẫn chuẩn bị giờ sinh chính xác\n• Đặt lịch hẹn với Founder Trâm Phạm\n\nBạn đang quan tâm đến nội dung nào hôm nay?',
        timestamp: new Date(),
      };
      setMessages([greeting]);
    }

    if (!isOpen) {
      hasInitializedRef.current = false;
    }
  }, [isOpen, messages.length]);

  // Auto-send pending message
  useEffect(() => {
    if (pendingMessage && isOpen) {
      const timer = setTimeout(() => {
        sendMessage(pendingMessage);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pendingMessage, isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const sendMessage = async (text?: string) => {
    const messageText = (text ?? input).trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!text) setInput('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          sessionId: sessionId,
          context: 'landing_page',
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId);
      }

      if (data.payment) {
        setPaymentInfo(data.payment);
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || data.message || 'Cảm ơn bạn đã nhắn tin. Chuyên viên sẽ sớm hỗ trợ bạn chi tiết hơn.',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content:
          'Hiện hệ thống trợ lý đang bận hoặc bạn có thể liên hệ trực tiếp qua Hotline/Zalo: 0868 888 688 để được hỗ trợ tức thì.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleQuickReply = (reply: QuickReply) => {
    sendMessage(reply.value);
  };

  const handleCopyCode = () => {
    if (paymentInfo?.paymentCode) {
      navigator.clipboard.writeText(paymentInfo.paymentCode);
      alert('Đã sao chép mã chuyển khoản!');
    }
  };

  const showQuickReplies = messages.length <= 2 && !isLoading;

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => openChat()}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-votive-red text-white shadow-xl hover:bg-[#8d0f0e] active:scale-95 transition-all duration-300 flex items-center gap-2 group ring-4 ring-votive-red/20"
          aria-label="Mở khung trò chuyện hỗ trợ"
        >
          <DiyaIcon size={20} className="text-white animate-pulse" />
          <span className="text-xs font-semibold pr-1 hidden sm:inline">Trợ lý Votive</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[580px] max-h-[85vh] rounded-3xl overflow-hidden glass-card border border-votive-border shadow-2xl flex flex-col animate-fade-in font-sans">
          {/* Header */}
          <div className="bg-gradient-to-r from-votive-red via-[#8d0f0e] to-[#700b0a] p-4 text-white flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                <DiyaIcon size={18} className="text-votive-sand" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-sm tracking-tight flex items-center gap-1.5">
                  Carmen · Trợ Lý Học Vụ
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </h3>
                <p className="text-[11px] text-votive-sand/90">Học Viện Votive & VedicVN</p>
              </div>
            </div>
            <button
              onClick={closeChat}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Đóng khung chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-votive-bg/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-votive-red text-white rounded-br-xs shadow-sm'
                      : 'bg-white text-votive-text rounded-bl-xs border border-votive-border shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>
                <span className="text-[10px] text-votive-muted px-1 mt-1">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-xs px-4 py-3 border border-votive-border shadow-xs">
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 bg-votive-red/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-votive-red/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-votive-red/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Quick replies */}
            {showQuickReplies && (
              <div className="space-y-2 pt-2">
                <p className="text-[11px] font-semibold text-votive-muted flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-votive-red" />
                  Gợi ý câu hỏi nhanh:
                </p>
                <div className="flex flex-col gap-1.5">
                  {QUICK_REPLIES.map((reply) => {
                    const Icon = reply.icon;
                    return (
                      <button
                        key={reply.id}
                        onClick={() => handleQuickReply(reply)}
                        disabled={isLoading}
                        className="text-left px-3 py-2 bg-white hover:bg-votive-surface border border-votive-border rounded-xl text-xs text-votive-text font-medium flex items-center gap-2 transition-all active:scale-[0.99] disabled:opacity-50"
                      >
                        <Icon className="w-3.5 h-3.5 text-votive-red shrink-0" />
                        <span>{reply.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* In-chat Payment QR Form */}
            {paymentInfo && (
              <div className="bg-votive-surface rounded-2xl p-4 border border-votive-border text-center space-y-3 mt-2">
                <div className="w-10 h-10 rounded-full bg-votive-red/10 text-votive-red flex items-center justify-center mx-auto">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-xs text-votive-text">Thanh toán dịch vụ</h4>
                  <p className="text-base font-bold text-votive-red mt-0.5">
                    {paymentInfo.amount?.toLocaleString('vi-VN')} VNĐ
                  </p>
                </div>

                {paymentInfo.qrUrl && (
                  <div className="bg-white p-2 rounded-xl border border-votive-border inline-block">
                    <img src={paymentInfo.qrUrl} alt="VietQR" className="w-44 h-44 object-contain mx-auto" />
                  </div>
                )}

                <div className="bg-white rounded-xl p-2.5 border border-votive-border text-left text-xs">
                  <span className="text-[11px] text-votive-muted block mb-1">Mã chuyển khoản:</span>
                  <div className="flex items-center justify-between font-mono font-bold text-votive-text">
                    <span>{paymentInfo.paymentCode}</span>
                    <button onClick={handleCopyCode} className="text-votive-red hover:underline text-[11px]">
                      Sao chép
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setPaymentInfo(null)}
                  className="text-xs text-votive-muted hover:underline"
                >
                  Đóng thông tin thanh toán
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-votive-border shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nhập câu hỏi bạn cần giải đáp..."
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-votive-border bg-votive-surface/40 text-xs focus:outline-none focus:border-votive-red focus:bg-white transition-all"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                className="p-2.5 rounded-xl bg-votive-red text-white hover:bg-[#8d0f0e] disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0"
                aria-label="Gửi"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-1.5 flex items-center justify-between text-[10px] text-votive-muted px-1">
              <span>Bảo mật 100% theo chuẩn VedicVN</span>
              <span>Hotline: 0868 888 688</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
