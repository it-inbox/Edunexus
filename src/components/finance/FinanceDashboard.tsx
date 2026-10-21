import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Breadcrumb } from '../common/Breadcrumb';
import { StatusBadge } from '../common/StatusBadge';
import { 
  DollarSign, Receipt, CreditCard, ArrowUpRight, 
  Download, Plus, Search, Filter, CheckCircle2, 
  Clock, AlertTriangle, X 
} from 'lucide-react';
import { AreaTrendChart, DonutBreakdownChart } from '../common/ChartComponents';
import confetti from 'canvas-confetti';

export const FinanceDashboard: React.FC = () => {
  const { invoices, recordPayment, addToast } = useApp();
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'Online (Card)' | 'Bank Transfer' | 'Cash' | 'Cheque'>('Online (Card)');
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  const selectedInvoice = invoices.find(inv => inv.id === selectedInvoiceId);

  const handleOpenPayment = (invoice: typeof invoices[0]) => {
    setSelectedInvoiceId(invoice.id);
    setPaymentAmount(invoice.balanceAED);
  };

  const handleProcessPayment = () => {
    if (!selectedInvoiceId || paymentAmount <= 0) return;
    
    recordPayment(selectedInvoiceId, paymentAmount);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    setReceiptData({
      receiptNo: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      invoiceNo: selectedInvoice?.invoiceNo,
      studentName: selectedInvoice?.studentName,
      grade: selectedInvoice?.grade,
      amount: paymentAmount,
      method: paymentMethod,
      date: new Date().toLocaleDateString('en-GB')
    });

    setSelectedInvoiceId(null);
    setIsReceiptModalOpen(true);
  };

  const collectionTrend = [
    { label: 'May', value: 2.1 },
    { label: 'Jun', value: 4.8 },
    { label: 'Jul', value: 1.2 },
    { label: 'Aug', value: 9.4 },
    { label: 'Sep', value: 18.2 },
    { label: 'Oct', value: 32.4 }
  ];

  const agingReport = [
    { bucket: 'Current (0-30 Days)', count: 48, amount: 'AED 3.8M', color: 'bg-indigo-500' },
    { bucket: 'Past Due (31-60 Days)', count: 24, amount: 'AED 2.4M', color: 'bg-amber-500' },
    { bucket: 'Past Due (61-90 Days)', count: 12, amount: 'AED 1.8M', color: 'bg-orange-500' },
    { bucket: 'Severely Delinquent (90+ Days)', count: 6, amount: 'AED 1.1M', color: 'bg-rose-500' },
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={[
        { label: 'Finance', route: '/finance' },
        { label: 'Fee Management & Accounts' }
      ]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200/80 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Institutional Finance Ledger</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Term 1 fee collections, multi-tier aging analysis, invoice dispatch & electronic receipts
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              addToast({
                type: 'info',
                title: 'Automated Reminders Dispatched',
                message: '23 overdue notice emails & SMS sent to parents.'
              });
            }}
            className="px-3.5 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-xs font-semibold shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Send Fee Reminders</span>
          </button>
          <button
            onClick={() => {
              addToast({
                type: 'success',
                title: 'Audit Ledger Exported',
                message: 'CSV financial reconciliation downloaded.'
              });
            }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Reconciliation CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Term 1 Expected</span>
          <span className="text-2xl font-bold font-mono text-gray-900 mt-1 block">AED 41.5M</span>
          <span className="text-[11px] text-gray-500">Across 3,200 students</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Collected</span>
          <span className="text-2xl font-bold font-mono text-emerald-600 mt-1 block">AED 32.4M</span>
          <span className="text-[11px] text-emerald-600 font-medium">78.0% Realized</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Outstanding Balance</span>
          <span className="text-2xl font-bold font-mono text-amber-600 mt-1 block">AED 9.1M</span>
          <span className="text-[11px] text-gray-500">Includes partial plans</span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Online Gateway Volume</span>
          <span className="text-2xl font-bold font-mono text-indigo-600 mt-1 block">AED 21.8M</span>
          <span className="text-[11px] text-indigo-600 font-medium">67% via Parent App</span>
        </div>
      </div>

      {/* Row 2: Invoices Master Table */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">Student Tuition & Transport Invoices</h3>
            <p className="text-xs text-gray-500">Click "Record Payment" to settle outstanding invoice balance</p>
          </div>
          <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
            {invoices.length} Invoices Loaded
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70 text-gray-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-3">Invoice #</th>
                <th className="py-3 px-3">Student Name</th>
                <th className="py-3 px-3">Grade</th>
                <th className="py-3 px-3">Term</th>
                <th className="py-3 px-3">Total Amount</th>
                <th className="py-3 px-3">Paid</th>
                <th className="py-3 px-3">Balance</th>
                <th className="py-3 px-3">Due Date</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-mono">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3.5 px-3 font-semibold text-gray-900">{inv.invoiceNo}</td>
                  <td className="py-3.5 px-3 font-sans font-semibold text-gray-900">{inv.studentName}</td>
                  <td className="py-3.5 px-3 font-sans">{inv.grade}</td>
                  <td className="py-3.5 px-3 font-sans text-gray-600">{inv.term}</td>
                  <td className="py-3.5 px-3">AED {inv.amountAED.toLocaleString()}</td>
                  <td className="py-3.5 px-3 text-emerald-600">AED {inv.paidAED.toLocaleString()}</td>
                  <td className="py-3.5 px-3 font-bold text-gray-900">
                    {inv.balanceAED === 0 ? 'AED 0' : `AED ${inv.balanceAED.toLocaleString()}`}
                  </td>
                  <td className="py-3.5 px-3 text-gray-500">{inv.dueDate}</td>
                  <td className="py-3.5 px-3 font-sans"><StatusBadge status={inv.status} /></td>
                  <td className="py-3.5 px-3 text-right font-sans">
                    {inv.balanceAED > 0 ? (
                      <button
                        onClick={() => handleOpenPayment(inv)}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-semibold cursor-pointer shadow-2xs transition-colors"
                      >
                        Record Pay
                      </button>
                    ) : (
                      <span className="text-xs text-emerald-600 font-semibold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Settled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 3: Aging Defaulters Analysis */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-xs">
        <h3 className="text-base font-bold text-gray-900 pb-3 border-b border-gray-100 mb-4">
          Overdue Fee Aging Analysis (Delinquency Tiers)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {agingReport.map((tier, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-gray-200/80 bg-gray-50">
              <span className="text-[10px] uppercase font-bold text-gray-500 block truncate">{tier.bucket}</span>
              <span className="text-lg font-bold font-mono text-gray-900 mt-1 block">{tier.amount}</span>
              <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                <span>{tier.count} Accounts</span>
                <span className={`w-2.5 h-2.5 rounded-full ${tier.color}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Record Payment Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900">Record Fee Payment</h3>
                <p className="text-xs text-gray-500 font-mono">{selectedInvoice.invoiceNo} · {selectedInvoice.studentName}</p>
              </div>
              <button onClick={() => setSelectedInvoiceId(null)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Outstanding Balance</label>
                <div className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-bold font-mono text-gray-900">
                  AED {selectedInvoice.balanceAED.toLocaleString()}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Amount to Pay (AED) *</label>
                <input
                  type="number"
                  max={selectedInvoice.balanceAED}
                  min={1}
                  value={paymentAmount}
                  onChange={e => setPaymentAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg font-mono font-bold focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={e => setPaymentMethod(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                >
                  <option value="Online (Card)">Credit / Debit Card (Network Intl / Stripe)</option>
                  <option value="Bank Transfer">Direct Bank Wire (ENBD / FAB)</option>
                  <option value="Cash">Cash at Bursar Reception Desk</option>
                  <option value="Cheque">Post-Dated Manager's Cheque</option>
                </select>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => setSelectedInvoiceId(null)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProcessPayment}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs"
                >
                  Confirm & Generate Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Official Tax Receipt Modal */}
      {isReceiptModalOpen && receiptData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                  EIS
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">Emirates International School</h3>
                  <p className="text-[10px] text-gray-500 font-mono">TRN Tax Registration: 100293847500003</p>
                </div>
              </div>
              <button onClick={() => setIsReceiptModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2 text-xs font-mono mb-4">
              <div className="flex justify-between"><span className="text-gray-500 font-sans">Official Receipt:</span> <strong>{receiptData.receiptNo}</strong></div>
              <div className="flex justify-between"><span className="text-gray-500 font-sans">Invoice Ref:</span> <strong>{receiptData.invoiceNo}</strong></div>
              <div className="flex justify-between"><span className="text-gray-500 font-sans">Student:</span> <strong className="font-sans">{receiptData.studentName} ({receiptData.grade})</strong></div>
              <div className="flex justify-between"><span className="text-gray-500 font-sans">Payment Mode:</span> <strong className="font-sans">{receiptData.method}</strong></div>
              <div className="flex justify-between"><span className="text-gray-500 font-sans">Transaction Date:</span> <strong>{receiptData.date}</strong></div>
              <div className="flex justify-between text-base font-bold text-emerald-700 pt-2 border-t border-gray-200">
                <span className="font-sans">Amount Paid:</span>
                <span>AED {receiptData.amount.toLocaleString()}.00</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-gray-400">Electronic verification code: KHDA-VAT-OK</span>
              <button
                onClick={() => {
                  setIsReceiptModalOpen(false);
                  addToast({
                    type: 'success',
                    title: 'Receipt Downloaded',
                    message: 'Official Tax Invoice PDF saved.'
                  });
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
