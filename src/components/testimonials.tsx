import { IconStar } from "./icons";

const testimonials = [
  {
    name: "نگار موسوی",
    role: "خرید نیم‌ست عروس · تهران",
    text: "از مشاورهٔ اول تا تحویل، همه‌چیز شفاف بود. وزن، اجرت و سنگ دقیقاً همان چیزی بود که در فاکتور نوشته شده بود. نیم‌ست شهرزاد در عکس هم زیبا بود، ولی از نزدیک بی‌نظیر است.",
    rating: 5,
  },
  {
    name: "آرمان رضایی",
    role: "خرید انگشتر الماس · اصفهان",
    text: "گواهی GIA و امکان استعلام آنلاین، مهم‌ترین دلیل انتخاب زرناب بود. بسته‌بندی و ارسال بیمه‌شده هم دقیقاً طبق زمان‌بندی انجام شد.",
    rating: 5,
  },
  {
    name: "مریم پارسا",
    role: "سرمایه‌گذاری طلا · شیراز",
    text: "برای خرید شمش مشاوره گرفتم؛ بدون اصرار به خرید گران‌تر، بهترین ترکیب وزن و اجرت را پیشنهاد دادند. حس می‌کنم با یک مشاور امین صحبت کرده‌ام.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {testimonials.map((item) => (
        <figure
          key={item.name}
          className="card-lux group relative flex flex-col justify-between rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1.5"
        >
          <div>
            <div className="flex gap-1 text-gold">
              {Array.from({ length: item.rating }).map((_, index) => (
                <IconStar key={index} className="size-3.5" />
              ))}
            </div>
            <blockquote className="mt-4 text-sm leading-7 text-espresso">«{item.text}»</blockquote>
          </div>
          <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-4">
            <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-gold-pale to-sand text-sm font-bold text-gold-deep">
              {item.name.slice(0, 1)}
            </span>
            <div>
              <p className="text-sm font-bold text-ink">{item.name}</p>
              <p className="text-[11px] text-muted">{item.role}</p>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
