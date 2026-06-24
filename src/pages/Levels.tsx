import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const LEVELS = [
  { num: '0',    name: 'Жёлтые комнаты',     class: 'Class 1',  danger: 'Безопасно',  status: 'Задокументирован', link: '/level-0', sound: 'Гудение ламп' },
  { num: '1',    name: 'Бетонные джунгли',    class: 'Class 2',  danger: 'Осторожно',  status: 'Задокументирован', link: null, sound: 'Капель воды' },
  { num: '2',    name: 'Вентиляционные шахты', class: 'Class 3', danger: 'Опасно',     status: 'Задокументирован', link: null, sound: 'Эхо шагов' },
  { num: '3',    name: 'Электрический рай',   class: 'Class 2',  danger: 'Осторожно',  status: 'Задокументирован', link: null, sound: 'Треск разрядов' },
  { num: '4',    name: 'Подводный город',     class: 'Class 4',  danger: 'Смертельно', status: 'Задокументирован', link: null, sound: 'Бурление воды' },
  { num: '5',    name: 'Terror Hotel',        class: 'Class 5',  danger: 'Смертельно', status: 'Задокументирован', link: null, sound: 'Скрип половиц' },
  { num: '6',    name: 'Тёмная комната',      class: 'Class 4',  danger: 'Смертельно', status: 'Частично',        link: null, sound: 'Абсолютная тишина' },
  { num: '7',    name: 'Разрушенный мол',     class: 'Class 2',  danger: 'Осторожно',  status: 'Задокументирован', link: null, sound: 'Шум волн' },
  { num: '8',    name: 'Пещеры',             class: 'Class 3',  danger: 'Опасно',     status: 'Частично',        link: null, sound: 'Капли в тишине' },
  { num: '9',    name: 'Труба',              class: 'Class 1',  danger: 'Безопасно',  status: 'Задокументирован', link: null, sound: 'Металлический гул' },
  { num: '!-!',  name: 'Беготня',            class: 'Class 5',  danger: 'Смертельно', status: 'Задокументирован', link: null, sound: 'Топот за спиной' },
  { num: '37',   name: 'Поле пшеницы',       class: 'Class 1',  danger: 'Безопасно',  status: 'Задокументирован', link: null, sound: 'Ветер' },
  { num: '94',   name: 'Библиотека',         class: 'Class 2',  danger: 'Осторожно',  status: 'Частично',        link: null, sound: 'Перелистывание страниц' },
  { num: '188',  name: 'Стадион',            class: 'Class 1',  danger: 'Безопасно',  status: 'Задокументирован', link: null, sound: 'Эхо трибун' },
  { num: '∞',    name: 'Конец и начало',     class: 'Class ?',  danger: 'Неизвестно', status: 'Гипотеза',        link: null, sound: '—' },
];

const DANGER_STYLE: Record<string, string> = {
  'Безопасно':  'text-green-800 bg-green-100 border-green-700/40',
  'Осторожно':  'text-orange-800 bg-orange-50 border-orange-700/40',
  'Опасно':     'text-red-800 bg-red-50 border-red-700/40',
  'Смертельно': 'text-red-900 bg-red-100 border-red-800/60',
  'Неизвестно': 'text-foreground/60 bg-card border-foreground/20',
};

const STATUS_STYLE: Record<string, string> = {
  'Задокументирован': 'text-green-700',
  'Частично':         'text-orange-700',
  'Гипотеза':         'text-foreground/40',
};

const Levels = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'num' | 'danger' | 'status'>('num');

  const filtered = LEVELS
    .filter(l =>
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.num.toLowerCase().includes(query.toLowerCase()) ||
      l.class.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'danger') return a.danger.localeCompare(b.danger);
      if (sort === 'status') return a.status.localeCompare(b.status);
      return 0;
    });

  return (
    <div className="grain min-h-screen ceiling overflow-x-hidden">
      {/* HEADER */}
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
          <span className="text-primary">Уровни</span>
        </div>
      </div>

      {/* TITLE */}
      <section className="container pt-6 pb-8">
        <span className="font-mono text-sm uppercase tracking-widest text-primary">Индекс · {LEVELS.length} записей</span>
        <h1 className="mt-2 font-display text-5xl font-700 uppercase leading-[0.95] md:text-7xl">
          Уровни
          <span className="block text-foreground/30">Закулисья</span>
        </h1>
        <p className="mt-4 max-w-lg font-body text-foreground/65">
          Полный реестр задокументированных и предполагаемых уровней. Данные обновляются по мере поступления полевых отчётов.
        </p>
      </section>

      {/* TOOLBAR */}
      <section className="container pb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-1 min-w-[200px] items-center gap-2 border-2 border-foreground/30 bg-card px-3 py-2 focus-within:border-foreground">
            <Icon name="Search" size={16} className="text-foreground/50" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Поиск по номеру или названию..."
              className="w-full bg-transparent font-mono text-sm outline-none placeholder:text-foreground/40"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-foreground/40 hover:text-foreground">
                <Icon name="X" size={14} />
              </button>
            )}
          </div>
          <div className="flex gap-1">
            {[
              { key: 'num', label: 'По номеру' },
              { key: 'danger', label: 'По опасности' },
              { key: 'status', label: 'По статусу' },
            ].map(s => (
              <button
                key={s.key}
                onClick={() => setSort(s.key as typeof sort)}
                className={`px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                  sort === s.key ? 'bg-foreground text-background' : 'border-2 border-foreground/30 hover:border-foreground'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TABLE */}
      <section className="container pb-16 overflow-x-auto">
        <table className="w-full border-2 border-foreground/30 text-left">
          <thead>
            <tr className="border-b-2 border-foreground bg-foreground text-background">
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-widest w-16">№</th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-widest">Название</th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-widest hidden md:table-cell">Класс</th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-widest">Опасность</th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-widest hidden lg:table-cell">Звук</th>
              <th className="px-4 py-3 font-mono text-xs uppercase tracking-widest hidden sm:table-cell">Статус</th>
              <th className="px-4 py-3 w-10" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center font-mono text-sm uppercase tracking-wider text-foreground/40">
                  Уровень не найден в архиве
                </td>
              </tr>
            )}
            {filtered.map((l, i) => (
              <tr
                key={l.num}
                onClick={() => l.link && navigate(l.link)}
                className={`border-b border-foreground/15 transition-colors ${
                  i % 2 === 0 ? 'bg-card/40' : 'bg-transparent'
                } ${l.link ? 'cursor-pointer hover:bg-primary/20' : 'hover:bg-foreground/5'}`}
              >
                <td className="px-4 py-3 font-mono font-700 text-primary">{l.num}</td>
                <td className="px-4 py-3">
                  <span className="font-display text-lg font-600 uppercase">{l.name}</span>
                </td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="font-mono text-sm text-foreground/60">{l.class}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${DANGER_STYLE[l.danger]}`}>
                    {l.danger}
                  </span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell font-mono text-xs text-foreground/50">
                  {l.sound}
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className={`flex items-center gap-1 font-mono text-xs uppercase tracking-wider ${STATUS_STYLE[l.status]}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${
                      l.status === 'Задокументирован' ? 'bg-green-600' :
                      l.status === 'Частично' ? 'bg-orange-500' : 'bg-foreground/30'
                    }`} />
                    {l.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {l.link
                    ? <Icon name="ArrowUpRight" size={16} className="text-primary" />
                    : <Icon name="Lock" size={14} className="text-foreground/25" />
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-foreground/40">
          Показано: {filtered.length} из {LEVELS.length} · Кликабельные строки имеют полную статью
        </p>
      </section>

      {/* FOOTER */}
      <footer className="border-t-2 border-foreground/20 bg-card/60">
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

export default Levels;