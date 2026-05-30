"use client";

import React, { useState, useEffect } from "react";

type Props = {
  open: boolean;
  loading?: boolean;
  initialReason?: string;
  onClose: () => void;
  onConfirm: (reason: string) => void | Promise<void>;
};

export default function CancelOrderModal({
  open,
  loading = false,
  initialReason = "",
  onClose,
  onConfirm,
}: Props) {
  const [reason, setReason] = useState(initialReason);

  useEffect(() => {
    if (open) setReason(initialReason);
  }, [open, initialReason]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="mb-1 text-lg font-semibold">Hủy đơn hàng</h3>
            <p className="text-sm text-gray-500">Vui lòng nhập lý do hủy đơn (bắt buộc)</p>
          </div>
          <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={5}
          className="mt-4 w-full resize-none rounded border border-gray-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-red-200"
          placeholder="Lý do hủy..."
        />

        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-md border border-gray-200 px-4 py-2 text-sm bg-white hover:bg-gray-50"
          >
            Đóng
          </button>
          <button
            type="button"
            onClick={() => onConfirm(reason)}
            disabled={loading || reason.trim() === ""}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {loading ? "Đang hủy..." : "Xác nhận hủy"}
          </button>
        </div>
      </div>
    </div>
  );
}
