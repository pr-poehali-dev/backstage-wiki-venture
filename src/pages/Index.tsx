import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/53c414b5-431f-46b0-b369-5cead2a6842c/files/a7a2a6f3-4e00-4275-ada9-473484236c88.jpg';

const NAV = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'categories', label: 'Категории', icon: 'LayoutGrid' },
  { id: 'search', label: 'Поиск', icon: 'Search' },
  { id: 'about', label: 'О проекте', icon: 'Info' },
];

const CATEGORIES = [
  { name: 'Уровни', icon: 'Layers', count: 142, desc: 'Карта известных пространств Закулисья — от Level 0 до бесконечности.', link: '/levels' },
  { name: 'Сущности', icon: 'Ghost', count: 67, desc: 'Каталог существ, обитающих между стен реальности.' },
  { name: 'Объекты', icon: 'Box', count: 53, desc: 'Аномальные предметы и артефакты, найденные внутри.' },
  { name: 'Феномены', icon: 'Zap', count: 38, desc: 'Необъяснимые явления, искажения времени и пространства.' },
  { name: 'Группы', icon: 'Users', count: 24, desc: 'Сообщества и фракции выживших исследователей.' },
  { name: 'Безопасность', icon: 'ShieldAlert', count: 19, desc: 'Протоколы выживания и классы опасности уровней.' },
];

const ARTICLES = [
  { title: 'Level 0 — «Жёлтые комнаты»', cat: 'Уровни', danger: 'Безопасно', tag: 'class-1', link: '/level-0', excerpt: 'Бесконечный лабиринт случайно сгенерированных офисных помещений с жёлтыми обоями и гудящими лампами.' },
  { title: 'Level !-! — «Беготня»', cat: 'Уровни', danger: 'Опасно', tag: 'class-4', excerpt: 'Тёмный тоннель, где за вами всегда что-то гонится. Не оборачивайтесь.' },
  { title: 'Сущность 8 — «Уборщик»', cat: 'Сущности', danger: 'Нейтрально', tag: 'entity', excerpt: 'Гуманоид, бесконечно протирающий пол. Игнорирует исследователей, пока его не трогают.' },
  { title: 'Миндальная вода', cat: 'Объекты', danger: 'Безопасно', tag: 'object', excerpt: 'Единственный безопасный источник питья. Восстанавливает рассудок и силы.' },
  { title: 'Феномен «Шум»', cat: 'Феномены', danger: 'Осторожно', tag: 'phenom', excerpt: 'Низкочастотное гудение, способное вызывать галлюцинации при длительном воздействии.' },
  { title: 'Группа «Картографы»', cat: 'Группы', danger: 'Союзники', tag: 'group', excerpt: 'Исследователи, составляющие карты переходов между уровнями Закулисья.' },
];

const AUTHORS = [
  { name: 'Архивариус_К', role: 'Главный редактор', articles: 214, edits: '4.8k', color: '45 95% 55%' },
  { name: 'lost_signal', role: 'Картограф уровней', articles: 96, edits: '2.1k', color: '32 90% 55%' },
  { name: 'Миндаль', role: 'Исследователь сущностей', articles: 73, edits: '1.6k', color: '54 85% 58%' },
  { name: 'no_clip', role: 'Хроникёр феноменов', articles: 51, edits: '980', color: '40 80% 50%' },
];

const dangerColor: Record<string, string> = {
  'Безопасно': 'border-green-700/50 text-green-800',
  'Опасно': 'border-red-700/60 text-red-800',
  'Осторожно': 'border-orange-700/50 text-orange-800',
  'Нейтрально': 'border-foreground/40 text-foreground/70',
  'Союзники': 'border-blue-700/50 text-blue-800',
};

const Index = () => {
  const [active, setActive] = useState('home');
  const [query, setQuery] = useState('');

  const filtered = ARTICLES.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      a.cat.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="grain min-h-screen ceiling overflow-x-hidden">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b-2 border-foreground/20 bg-background/85 backdrop-blur-md">
        <div className="container flex items-center justify-between py-3">
          <button onClick={() => setActive('home')} className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center border-2 border-foreground bg-primary animate-flicker">
              <Icon name="DoorOpen" size={20} className="text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-700 uppercase tracking-[0.2em]">Закулисье</span>
          </button>
          <nav className="hidden gap-1 md:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => setActive(n.id)}
                className={`flex items-center gap-2 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                  active === n.id
                    ? 'bg-foreground text-background'
                    : 'text-foreground/70 hover:bg-foreground/10'
                }`}
              >
                <Icon name={n.icon} size={14} />
                {n.label}
              </button>
            ))}
          </nav>
          <div className="flex gap-1 md:hidden">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => setActive(n.id)}
                className={`p-2 ${active === n.id ? 'text-primary' : 'text-foreground/60'}`}
              >
                <Icon name={n.icon} size={18} />
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* HERO */}
      {active === 'home' && (
        <section className="relative">
          <div className="absolute inset-0 room-grid opacity-40" />
          <div className="container relative grid items-center gap-8 py-16 md:grid-cols-2 md:py-24">
            <div className="animate-fade-up">
              <div className="mb-4 inline-flex items-center gap-2 border border-foreground/30 bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-widest">
                <span className="h-2 w-2 animate-flicker bg-primary" /> Архив активен · 343 статьи
              </div>
              <h1 className="font-display text-5xl font-700 uppercase leading-[0.95] md:text-7xl">
                Вики
                <span className="text-glow block text-primary">Закулисья</span>
              </h1>
              <p className="mt-5 max-w-md font-body text-base text-foreground/70">
                Энциклопедия лиминальных пространств. Уровни, сущности, феномены и протоколы
                выживания между стен реальности.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  onClick={() => setActive('categories')}
                  className="group flex items-center gap-2 border-2 border-foreground bg-primary px-6 py-3 font-mono text-sm font-700 uppercase tracking-wider text-primary-foreground transition-all hover:translate-x-1 hover:shadow-[4px_4px_0_hsl(var(--foreground))]"
                >
                  Открыть архив <Icon name="ArrowRight" size={16} />
                </button>
                <button
                  onClick={() => setActive('search')}
                  className="flex items-center gap-2 border-2 border-foreground/40 px-6 py-3 font-mono text-sm uppercase tracking-wider transition-colors hover:border-foreground"
                >
                  <Icon name="Search" size={16} /> Найти
                </button>
              </div>
            </div>
            <div className="relative animate-drift">
              <div className="absolute -inset-3 border-2 border-foreground/30" />
              <img
                src={HERO_IMG}
                alt="Жёлтые комнаты Закулисья"
                className="relative aspect-square w-full border-2 border-foreground object-cover contrast-110 sepia-[0.25]"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-background/80 px-3 py-2 font-mono text-[10px] uppercase backdrop-blur">
                <span>level_0.archive</span>
                <span className="animate-flicker text-primary">● REC</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* HOME — categories + articles */}
      {active === 'home' && (
        <>
          <SectionTitle index="01" title="Категории" sub="Разделы архива" />
          <CategoriesGrid onOpen={() => setActive('categories')} />
          <SectionTitle index="02" title="Свежие статьи" sub="Последние записи" />
          <ArticlesGrid items={ARTICLES} />
          <SectionTitle index="03" title="Хранители архива" sub="Авторы и их вклад" />
          <AuthorsGrid />
        </>
      )}

      {active === 'categories' && (
        <>
          <SectionTitle index="—" title="Категории" sub="Все разделы Закулисья" />
          <CategoriesGrid onOpen={() => setActive('search')} />
          <ArticlesGrid items={ARTICLES} />
        </>
      )}

      {active === 'search' && (
        <section className="container py-16">
          <SectionTitle index="—" title="Поиск" sub="Найди запись в архиве" inline />
          <div className="mx-auto mt-6 max-w-2xl">
            <div className="flex items-center gap-3 border-2 border-foreground bg-card px-4 py-3 shadow-[4px_4px_0_hsl(var(--foreground))]">
              <Icon name="Search" size={22} className="text-foreground/60" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Уровень, сущность, феномен..."
                className="w-full bg-transparent font-mono text-base outline-none placeholder:text-foreground/40"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-foreground/50 hover:text-foreground">
                  <Icon name="X" size={18} />
                </button>
              )}
            </div>
            <p className="mt-3 font-mono text-xs uppercase tracking-wider text-foreground/50">
              Найдено записей: {filtered.length}
            </p>
          </div>
          <div className="mt-8">
            <ArticlesGrid items={filtered} bare />
          </div>
        </section>
      )}

      {active === 'about' && <About />}

      {/* FOOTER */}
      <footer className="mt-12 border-t-2 border-foreground/20 bg-card/60">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <div className="flex items-center gap-2 font-display uppercase tracking-[0.2em]">
            <Icon name="DoorOpen" size={18} /> Закулисье · Вики
          </div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-foreground/50">
            Если вы это читаете — вы уже внутри. Оставайтесь спокойны.
          </p>
        </div>
      </footer>
    </div>
  );
};

const SectionTitle = ({
  index,
  title,
  sub,
  inline,
}: {
  index: string;
  title: string;
  sub: string;
  inline?: boolean;
}) => (
  <div className={`container ${inline ? 'pt-16' : 'pt-16 pb-2'}`}>
    <div className="flex items-end gap-4 border-b-2 border-foreground/20 pb-4">
      <span className="font-mono text-sm text-primary">[{index}]</span>
      <h2 className="font-display text-3xl font-700 uppercase tracking-wide md:text-4xl">{title}</h2>
      <span className="mb-1 hidden font-mono text-xs uppercase tracking-widest text-foreground/40 md:block">
        {sub}
      </span>
    </div>
  </div>
);

const CategoriesGrid = ({ onOpen }: { onOpen: () => void }) => {
  const navigate = useNavigate();
  return (
  <section className="container grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-3">
    {CATEGORIES.map((c, i) => {
      const cat = c as typeof c & { link?: string };
      return (
      <button
        key={c.name}
        onClick={() => cat.link ? navigate(cat.link) : onOpen()}
        style={{ animationDelay: `${i * 70}ms` }}
        className="group animate-fade-up border-2 border-foreground/30 bg-card p-5 text-left opacity-0 transition-all hover:border-foreground hover:shadow-[4px_4px_0_hsl(var(--foreground))]"
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center border-2 border-foreground bg-primary/80 transition-colors group-hover:bg-primary">
            <Icon name={c.icon} size={22} className="text-primary-foreground" />
          </div>
          <span className="font-mono text-2xl font-800 text-foreground/20 transition-colors group-hover:text-primary">
            {c.count}
          </span>
        </div>
        <h3 className="font-display text-xl font-600 uppercase tracking-wide">{c.name}</h3>
        <p className="mt-1 font-body text-sm text-foreground/60">{c.desc}</p>
      </button>
    );
    })}
  </section>
  );
};

const ArticlesGrid = ({ items, bare }: { items: typeof ARTICLES; bare?: boolean }) => {
  const navigate = useNavigate();
  return (
    <section className={`container grid gap-4 ${bare ? '' : 'py-8'} md:grid-cols-2`}>
      {items.length === 0 && (
        <div className="col-span-full border-2 border-dashed border-foreground/30 py-12 text-center font-mono text-sm uppercase tracking-wider text-foreground/50">
          Записей не найдено · возможно, этот уровень ещё не задокументирован
        </div>
      )}
      {items.map((a, i) => {
        const link = (a as { link?: string }).link;
        return (
          <article
            key={a.title}
            onClick={() => link && navigate(link)}
            style={{ animationDelay: `${i * 60}ms` }}
            className={`group animate-fade-up relative overflow-hidden border-2 border-foreground/30 bg-card p-5 opacity-0 transition-all hover:border-foreground ${
              link ? 'cursor-pointer hover:shadow-[4px_4px_0_hsl(var(--foreground))]' : ''
            }`}
          >
            <div className="absolute right-0 top-0 bg-foreground px-2 py-1 font-mono text-[10px] uppercase text-background">
              {a.tag}
            </div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-primary">{a.cat}</span>
            <h3 className="mt-2 font-display text-2xl font-600 uppercase leading-tight transition-colors group-hover:text-primary">
              {a.title}
            </h3>
            <p className="mt-2 font-body text-sm text-foreground/65">{a.excerpt}</p>
            <div className="mt-4 flex items-center justify-between">
              <span
                className={`border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider ${dangerColor[a.danger]}`}
              >
                {a.danger}
              </span>
              <span className="flex items-center gap-1 font-mono text-xs text-foreground/50 transition-transform group-hover:translate-x-1">
                {link ? 'Открыть статью' : 'Читать'} <Icon name="ArrowUpRight" size={14} />
              </span>
            </div>
          </article>
        );
      })}
    </section>
  );
};

const AuthorsGrid = () => (
  <section className="container grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
    {AUTHORS.map((a, i) => (
      <div
        key={a.name}
        style={{ animationDelay: `${i * 70}ms` }}
        className="animate-fade-up border-2 border-foreground/30 bg-card p-5 text-center opacity-0 transition-all hover:border-foreground hover:shadow-[4px_4px_0_hsl(var(--foreground))]"
      >
        <div
          className="mx-auto flex h-16 w-16 items-center justify-center border-2 border-foreground font-display text-2xl font-700 uppercase"
          style={{ background: `hsl(${a.color})` }}
        >
          {a.name[0]}
        </div>
        <h3 className="mt-3 font-mono text-sm font-700">{a.name}</h3>
        <p className="font-body text-xs text-foreground/60">{a.role}</p>
        <div className="mt-3 flex justify-center gap-4 border-t border-foreground/20 pt-3 font-mono text-xs">
          <span className="flex flex-col">
            <b className="text-primary text-base">{a.articles}</b>
            <span className="text-foreground/50 uppercase tracking-wider">статей</span>
          </span>
          <span className="flex flex-col">
            <b className="text-base">{a.edits}</b>
            <span className="text-foreground/50 uppercase tracking-wider">правок</span>
          </span>
        </div>
      </div>
    ))}
  </section>
);

const About = () => (
  <section className="container py-16">
    <SectionTitle index="—" title="О проекте" sub="Что такое этот архив" inline />
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      <div className="md:col-span-2 space-y-4 font-body text-foreground/75">
        <p className="text-lg leading-relaxed">
          <span className="float-left mr-2 font-display text-5xl font-700 leading-none text-primary">З</span>
          акулисье — это совместная вики-энциклопедия, документирующая лиминальные пространства:
          бесконечные коридоры, заброшенные уровни и сущности, что обитают за пределами обычной
          реальности. Каждая статья — результат коллективных полевых наблюдений.
        </p>
        <p>
          Наша миссия — собрать и систематизировать знания о Закулисье, чтобы будущие исследователи
          могли выжить и вернуться. Архив поддерживается сообществом хранителей и обновляется ежедневно.
        </p>
        <div className="border-l-4 border-primary bg-card p-4 font-mono text-sm">
          «Если вы оказались не там, где должны быть — сохраняйте спокойствие, ищите миндальную воду
          и не привлекайте внимания».
        </div>
      </div>
      <div className="space-y-3">
        {[
          { icon: 'FileText', label: 'Статей в архиве', val: '343' },
          { icon: 'Users', label: 'Активных хранителей', val: '28' },
          { icon: 'GitCommit', label: 'Правок за месяц', val: '1 204' },
          { icon: 'Layers', label: 'Описано уровней', val: '142' },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-4 border-2 border-foreground/30 bg-card p-4">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-foreground bg-primary">
              <Icon name={s.icon} size={18} className="text-primary-foreground" />
            </div>
            <div>
              <div className="font-display text-2xl font-700">{s.val}</div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-foreground/50">
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Index;