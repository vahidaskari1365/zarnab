import { getLeads, getSubscribers } from "@/lib/data";
import { faNumber, formatDate, leadStatusLabels } from "@/lib/admin-ui";
import { updateLeadStatusAction } from "../../actions";
import { IconMail, IconPhone, IconSparkle } from "@/components/icons";

export const dynamic = "force-dynamic";

const statuses = ["new", "contacted", "quoted", "closed"];

export default async function AdminLeadsPage() {
  const [leads, subscribers] = await Promise.all([getLeads(80), getSubscribers(40)]);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-[11px] font-bold tracking-[0.2em] text-gold-deep">مدیریت ارتباط با مشتری</p>
        <h1 className="mt-2 text-2xl font-extrabold text-ink">درخواست‌های مشاوره</h1>
        <p className="mt-1 text-xs text-muted">
          {faNumber(leads.length)} درخواست · {faNumber(leads.filter((lead) => lead.status === "new").length)} در انتظار پاسخ
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {leads.map((lead) => (
          <div key={lead.id} className="rounded-2xl border border-line bg-white/85 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-ink">{lead.name}</p>
                <p className="mt-0.5 text-[11px] text-gold-deep">{lead.topic}</p>
                <p className="mt-1 text-[10px] text-muted">{lead.source} · {formatDate(lead.createdAt)}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[10px] ${lead.status === "new" ? "bg-amber-100 text-amber-800" : "bg-cream text-gold-deep"}`}>
                {leadStatusLabels[lead.status] ?? lead.status}
              </span>
            </div>

            {lead.message && (
              <p className="mt-3 rounded-xl bg-cream/50 p-3 text-[11px] leading-6 text-muted">{lead.message}</p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
              <a href={`tel:${lead.phone}`} className="flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-espresso" dir="ltr">
                <IconPhone className="size-3.5 text-gold-deep" /> {lead.phone}
              </a>
              {lead.email && (
                <a href={`mailto:${lead.email}`} className="flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-espresso" dir="ltr">
                  <IconMail className="size-3.5 text-gold-deep" /> {lead.email}
                </a>
              )}
            </div>

            <form action={updateLeadStatusAction} className="mt-3 flex items-center gap-2">
              <input type="hidden" name="id" value={lead.id} />
              <select name="status" defaultValue={lead.status} className="field !w-auto !py-1.5 text-[11px]">
                {statuses.map((status) => (
                  <option key={status} value={status}>{leadStatusLabels[status]}</option>
                ))}
              </select>
              <button type="submit" className="rounded-full bg-forest px-3 py-1.5 text-[10px] text-ivory">ثبت</button>
            </form>
          </div>
        ))}

        {leads.length === 0 && (
          <div className="rounded-2xl border border-line bg-white/85 p-10 text-center lg:col-span-2">
            <IconMail className="mx-auto size-8 text-gold/60" />
            <p className="mt-3 text-sm font-bold text-ink">درخواستی ثبت نشده است</p>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-line bg-white/85 p-5">
        <div className="flex items-center gap-2">
          <IconSparkle className="size-4 text-gold-deep" />
          <h2 className="text-sm font-bold text-ink">مشترکان خبرنامه</h2>
          <span className="rounded-full bg-cream px-2 py-0.5 text-[10px] text-gold-deep">{faNumber(subscribers.length)}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {subscribers.map((subscriber) => (
            <span key={subscriber.id} className="rounded-full border border-line bg-ivory px-3 py-1.5 text-[11px] text-muted" dir="ltr">
              {subscriber.email}
            </span>
          ))}
          {subscribers.length === 0 && <p className="text-xs text-muted">هنوز ایمیلی ثبت نشده است.</p>}
        </div>
      </div>
    </div>
  );
}
