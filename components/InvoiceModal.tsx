'use client'
import { X, Download } from 'lucide-react'

export type InvoiceRequest = {
  id: number
  created_at: string
  name: string
  email: string
  phone: string
  service: string
  num_pages: string | null
  stream: string | null
  subject_type: string | null
  project_scope: string | null
  message: string | null
  delivery_days: number | null
  delivery_method: string | null
  delivery_city: string | null
  base_price: number | null
  urgency_fee: number | null
  delivery_fee: number | null
  loyalty_discount: number | null
  loyalty_percent: number | null
  total_price: number | null
  invoice_number: string | null
}

function fmt(n: number | null) {
  return n ? `₹${n.toLocaleString('en-IN')}` : '—'
}

function deliveryLabel(m: string | null) {
  if (!m) return null
  return {
    local_pickup: '🏠 Local Pickup — Customer collects in person',
    local_rapido: '🛵 Local Rapido — Customer pays both pickup & return charges',
    long_distance: '📦 Long Distance Courier — Customer pays all courier charges (both ways)',
  }[m] ?? m
}

export default function InvoiceModal({ req, onClose }: { req: InvoiceRequest; onClose: () => void }) {
  const invoiceNo = req.invoice_number || `RWK-${String(req.id).padStart(4, '0')}`
  const date = new Date(req.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
  const subtotal = (req.base_price || 0) + (req.urgency_fee || 0) + (req.delivery_fee || 0)
  const total = req.total_price || subtotal - (req.loyalty_discount || 0)

  function handleDownload() {
    window.print()
  }

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          body > *:not(#invoice-print-root) { display: none !important; }
          #invoice-print-root { position: fixed; inset: 0; z-index: 9999; }
          .no-print { display: none !important; }
          .invoice-sheet { box-shadow: none !important; border: none !important; }
        }
      `}</style>

      <div id="invoice-print-root"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.75)' }}>

        {/* Close + Download buttons */}
        <div className="no-print absolute top-4 right-4 flex gap-2 z-10">
          <button onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
            style={{ background: 'var(--gold)', color: 'var(--navy)' }}>
            <Download size={15} /> Download PDF
          </button>
          <button onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
            style={{ background: 'rgba(255,80,80,0.15)', color: '#ff6b6b' }}>
            <X size={15} /> Close
          </button>
        </div>

        {/* Invoice Sheet */}
        <div className="invoice-sheet overflow-y-auto max-h-[90vh] w-full max-w-2xl rounded-2xl"
          style={{ background: '#fff', color: '#1a1a2e' }}>

          {/* Header */}
          <div className="px-10 py-8" style={{ background: '#0a1628' }}>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-extrabold" style={{ color: '#c9a84c' }}>Records Writing Kakinada</h1>
                <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Professional Academic & Technical Services</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Kakinada, Andhra Pradesh, India</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>Invoice</p>
                <p className="text-xl font-bold mt-1" style={{ color: '#c9a84c' }}>{invoiceNo}</p>
                <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>{date}</p>
              </div>
            </div>
          </div>

          <div className="px-10 py-8 flex flex-col gap-7">
            {/* Bill To */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a84c' }}>Bill To</p>
                <p className="font-semibold text-base">{req.name}</p>
                {req.email && <p className="text-sm mt-0.5" style={{ color: '#555' }}>{req.email}</p>}
                {req.phone && <p className="text-sm" style={{ color: '#555' }}>{req.phone}</p>}
              </div>
              <div className="text-right">
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#c9a84c' }}>Service Details</p>
                <p className="font-semibold">{req.service}</p>
                {req.stream && <p className="text-sm" style={{ color: '#555' }}>{req.stream}</p>}
                {req.subject_type && <p className="text-sm" style={{ color: '#555' }}>{req.subject_type}</p>}
                {req.project_scope && <p className="text-sm" style={{ color: '#555' }}>{req.project_scope}</p>}
              </div>
            </div>

            {/* Line Items */}
            <div>
              <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#0a1628', color: '#c9a84c' }}>
                    <th className="text-left px-4 py-3 rounded-tl-lg">Description</th>
                    <th className="text-right px-4 py-3 rounded-tr-lg">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Base service */}
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td className="px-4 py-3">
                      <p className="font-medium">{req.service}</p>
                      {req.num_pages && <p className="text-xs mt-0.5" style={{ color: '#888' }}>{req.num_pages} pages</p>}
                      {req.delivery_days && <p className="text-xs" style={{ color: '#888' }}>Delivery in {req.delivery_days} day{req.delivery_days > 1 ? 's' : ''}</p>}
                    </td>
                    <td className="px-4 py-3 text-right font-medium">{fmt(req.base_price)}</td>
                  </tr>

                  {/* Urgency fee */}
                  {!!req.urgency_fee && (
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td className="px-4 py-3" style={{ color: '#555' }}>Urgency Fee</td>
                      <td className="px-4 py-3 text-right" style={{ color: '#e05' }}>{fmt(req.urgency_fee)}</td>
                    </tr>
                  )}

                  {/* Delivery */}
                  {req.delivery_method && (
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td className="px-4 py-3">
                        <p style={{ color: '#555' }}>Delivery</p>
                        <p className="text-xs mt-0.5" style={{ color: '#888' }}>{deliveryLabel(req.delivery_method)}</p>
                        {req.delivery_city && <p className="text-xs" style={{ color: '#888' }}>{req.delivery_city}</p>}
                      </td>
                      <td className="px-4 py-3 text-right text-xs" style={{ color: '#888' }}>
                        {req.delivery_fee ? fmt(req.delivery_fee) : 'Paid by customer'}
                      </td>
                    </tr>
                  )}

                  {/* Subtotal */}
                  {(req.urgency_fee || req.delivery_fee) ? (
                    <tr style={{ borderBottom: '1px solid #eee', background: '#fafafa' }}>
                      <td className="px-4 py-2 text-sm font-semibold" style={{ color: '#555' }}>Subtotal</td>
                      <td className="px-4 py-2 text-right text-sm font-semibold">{fmt(subtotal)}</td>
                    </tr>
                  ) : null}

                  {/* Loyalty discount */}
                  {!!req.loyalty_discount && (
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <td className="px-4 py-3" style={{ color: '#16a34a' }}>
                        Loyalty Discount {req.loyalty_percent ? `(${req.loyalty_percent}%)` : ''}
                      </td>
                      <td className="px-4 py-3 text-right" style={{ color: '#16a34a' }}>− {fmt(req.loyalty_discount)}</td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr style={{ background: '#0a1628' }}>
                    <td className="px-4 py-4 font-bold text-base rounded-bl-lg" style={{ color: '#c9a84c' }}>Total</td>
                    <td className="px-4 py-4 text-right font-extrabold text-xl rounded-br-lg" style={{ color: '#c9a84c' }}>{fmt(total)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Notes */}
            {req.message && (
              <div className="px-4 py-3 rounded-xl" style={{ background: '#f8f8f8', border: '1px solid #eee' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: '#c9a84c' }}>Notes</p>
                <p className="text-sm" style={{ color: '#555' }}>{req.message}</p>
              </div>
            )}

            {/* Footer */}
            <div className="text-center pt-4" style={{ borderTop: '1px solid #eee' }}>
              <p className="text-xs" style={{ color: '#aaa' }}>Thank you for choosing Records Writing Kakinada</p>
              <p className="text-xs mt-0.5" style={{ color: '#ccc' }}>This is a computer-generated invoice.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
