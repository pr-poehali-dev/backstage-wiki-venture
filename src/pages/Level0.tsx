import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/53c414b5-431f-46b0-b369-5cead2a6842c/files/a7a2a6f3-4e00-4275-ada9-473484236c88.jpg';

const STATS = [
  { label: 'Класс опасности', val: 'Class 1', icon: 'ShieldCheck' },
  { label: 'Безопасность', val: 'Безопасно', icon: 'Check' },
  { label: 'Сущности', val: 'Отсутствуют', icon: 'CircleSlash' },
  { label: 'Объём', val: 'Бесконечен', icon: 'Infinity' },
];

const SURVIVAL = [
  'Сохраняйте спокойствие — паника привлекает «нунклип» в стены.',
  'Не оставайтесь на одном месте слишком долго: планировка меняется.',
  'Прислушивайтесь к гудению ламп — оно помогает ориентироваться.',
  'Ищите выходы к нижним уровням, если хотите двигаться вглубь.',
];

const OBJECTS = [
  {
    name: 'Миндальная вода',
    tag: 'object-001',
    desc: 'Изредка встречается в брошенных бутылках. Восстанавливает рассудок и силы.',
    icon: 'Droplet',
  },
  {
    name: 'Жёлтая обойная плитка',
    tag: 'object-014',
    desc: 'Фрагмент стены. Иногда используется картографами как метка пройденного пути.',
    icon: 'Square',
  },
];

const Level0 = () => {
  const navigate = useNavigate();

  return (
    <div className="grain min-h-screen ceiling overflow-x-hidden">
      {/* TOP BAR */}
      <header className="sticky top-0 z-40 border-b-2 border-foreground/20 bg-background/85 backdrop-blur-md">
        <div className="container flex items-center justify-between py-3">
          <button onClick={() => navigate('/')} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center border-2 border-foreground bg-primary animate-flicker">
              <Icon name="DoorOpen" size={20} className="text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-700 uppercase tracking-[0.2em]">Закулисье</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 border-2 border-foreground/40 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors hover:border-foreground"
          >
            <Icon name="ArrowLeft" size={14} /> В архив
          </button>
        </div>
      </header>

      {/* BREADCRUMB */}
      <div className="container pt-6">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-foreground/50">
          <button onClick={() => navigate('/')} className="hover:text-primary">Архив</button>
          <Icon name="ChevronRight" size={12} />
          <span>Уровни</span>
          <Icon name="ChevronRight" size={12} />
          <span className="text-primary">Level 0</span>
        </div>
      </div>

      {/* TITLE */}
      <section className="container relative pt-6">
        <div className="absolute inset-0 room-grid opacity-30" />
        <div className="relative animate-fade-up">
          <span className="font-mono text-sm uppercase tracking-widest text-primary">Уровни · class-1</span>
          <h1 className="mt-2 font-display text-5xl font-700 uppercase leading-[0.95] md:text-7xl">
            Level 0
            <span className="text-glow block text-primary">Жёлтые комнаты</span>
          </h1>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="container py-8">
        <div className="relative animate-fade-up">
          <div className="absolute -inset-2 border-2 border-foreground/30" />
          <img
            src={HERO_IMG}
            alt="Level 0 — Жёлтые комнаты"
            className="relative aspect-[21/9] w-full border-2 border-foreground object-cover contrast-110 sepia-[0.25]"
          />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-background/80 px-3 py-2 font-mono text-[10px] uppercase backdrop-blur">
            <span>level_0.archive · noclip_entry</span>
            <span className="animate-flicker text-primary">● REC</span>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container grid gap-3 pb-8 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            style={{ animationDelay: `${i * 60}ms` }}
            className="animate-fade-up flex items-center gap-3 border-2 border-foreground/30 bg-card p-4 opacity-0"
          >
            <div className="flex h-10 w-10 items-center justify-center border-2 border-foreground bg-primary">
              <Icon name={s.icon} size={18} className="text-primary-foreground" />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-foreground/50">{s.label}</div>
              <div className="font-display text-lg font-700 uppercase">{s.val}</div>
            </div>
          </div>
        ))}
      </section>

      {/* BODY */}
      <section className="container grid gap-8 pb-12 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <Block title="Описание" icon="FileText">
            <p className="text-lg leading-relaxed">
              <span className="float-left mr-2 font-display text-5xl font-700 leading-none text-primary">L</span>
              evel 0 — это начальная точка Закулисья. Бесконечный лабиринт случайно сгенерированных
              офисных помещений с монотонными жёлтыми обоями, влажным ковровым покрытием и
              флуоресцентными лампами, издающими постоянное гудение.
            </p>
            <p>
              Освещение здесь неравномерное: часть ламп мерцает, создавая зоны полумрака. Воздух
              затхлый и влажный. Большинство людей попадают сюда, случайно «провалившись» сквозь
              реальность — этот феномен называют «нунклипом».
            </p>
          </Block>

          <Block title="Выживание" icon="ShieldAlert">
            <ul className="space-y-3">
              {SURVIVAL.map((s, i) => (
                <li key={i} className="flex gap-3 font-body">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center border border-foreground bg-primary/80 font-mono text-xs font-700">
                    {i + 1}
                  </span>
                  <span className="text-foreground/80">{s}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Найденные объекты" icon="Box">
            <div className="grid gap-3 sm:grid-cols-2">
              {OBJECTS.map((o) => (
                <div key={o.name} className="border-2 border-foreground/30 bg-background/40 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center border-2 border-foreground bg-primary">
                      <Icon name={o.icon} size={16} className="text-primary-foreground" />
                    </div>
                    <span className="font-mono text-[10px] uppercase text-foreground/40">{o.tag}</span>
                  </div>
                  <h4 className="font-display text-lg font-600 uppercase">{o.name}</h4>
                  <p className="mt-1 font-body text-sm text-foreground/65">{o.desc}</p>
                </div>
              ))}
            </div>
          </Block>
        </div>

        {/* SIDEBAR */}
        <aside className="space-y-4">
          <div className="border-2 border-foreground bg-card p-5 shadow-[4px_4px_0_hsl(var(--foreground))]">
            <h3 className="border-b-2 border-foreground/20 pb-2 font-display text-lg font-700 uppercase tracking-wide">
              Сводка
            </h3>
            <dl className="mt-3 space-y-2 font-mono text-sm">
              {[
                ['Обозначение', 'Level 0'],
                ['Название', 'Жёлтые комнаты'],
                ['Класс', 'Class 1'],
                ['Звук', 'Гудение ламп'],
                ['Выход', 'Нунклип / Level 1'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-2 border-b border-foreground/10 pb-1">
                  <dt className="text-foreground/50 uppercase tracking-wider text-xs">{k}</dt>
                  <dd className="text-right font-700">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="border-l-4 border-primary bg-card p-4 font-mono text-sm leading-relaxed">
            «Если вы это читаете и слышите гудение — вы в Level 0. Сохраняйте спокойствие и продолжайте
            идти».
          </div>

          <button
            onClick={() => navigate('/')}
            className="flex w-full items-center justify-center gap-2 border-2 border-foreground bg-primary px-6 py-3 font-mono text-sm font-700 uppercase tracking-wider text-primary-foreground transition-all hover:translate-x-1 hover:shadow-[4px_4px_0_hsl(var(--foreground))]"
          >
            <Icon name="ArrowLeft" size={16} /> Вернуться в архив
          </button>
        </aside>
      </section>

      {/* FOOTER */}
      <footer className="mt-4 border-t-2 border-foreground/20 bg-card/60">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <div className="flex items-center gap-2 font-display uppercase tracking-[0.2em]">
            <Icon name="DoorOpen" size={18} /> Закулисье · Вики
          </div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-foreground/50">
            Статья последний раз обновлена хранителем «Архивариус_К».
          </p>
        </div>
      </footer>
    </div>
  );
};

const Block = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) => (
  <div className="animate-fade-up">
    <div className="mb-4 flex items-center gap-3 border-b-2 border-foreground/20 pb-3">
      <Icon name={icon} size={22} className="text-primary" />
      <h2 className="font-display text-3xl font-700 uppercase tracking-wide">{title}</h2>
    </div>
    <div className="space-y-4 font-body text-foreground/75">{children}</div>
  </div>
);

export default Level0;