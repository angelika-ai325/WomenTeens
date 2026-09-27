const PreflightCheck = ({ route, gear, expLevel, groupSize }) => {
  const checks = [
    {
      label: 'Маршрут построен',
      ok: route.length >= 2,
    },
    {
      label: 'Офлайн GPX-карта',
      ok: gear.gpxPhone,
    },
    {
      label: 'Запас воды',
      ok: gear.water,
    },
    {
      label: 'Аптечка',
      ok: gear.firstAid,
    },
    {
      label: 'Фонарь',
      ok: gear.flashlight,
    },
    {
      label: 'Пауэрбанк',
      ok: gear.powerbank,
    },
    {
      label: 'Тёплая одежда',
      ok: gear.fleece || gear.thermals,
    },
    {
      label: 'Группа не менее 2 человек',
      ok: Number(groupSize) >= 2,
    },
  ];

  const completed = checks.filter(check => check.ok).length;
  const total = checks.length;
  const percentage = Math.round((completed / total) * 100);

  let status = 'Требуется подготовка';

  if (percentage >= 75) {
    status = 'Почти готово';
  }

  if (percentage === 100) {
    status = 'Готово к проверке';
  }

  return (
    <div
      className="card"
      style={{
        marginTop: '1rem',
        borderLeft: '4px solid var(--primary)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <div>
          <div className="card-overline">Предстартовая проверка</div>
          <div className="card-title">Готовность группы</div>
        </div>

        <div
          style={{
            fontWeight: 700,
            fontSize: '18px',
            color: percentage === 100
              ? 'var(--tertiary)'
              : 'var(--primary)',
          }}
        >
          {completed}/{total}
        </div>
      </div>

      <div
        style={{
          height: '8px',
          background: 'var(--surface-container)',
          borderRadius: '10px',
          overflow: 'hidden',
          marginBottom: '1rem',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            background: percentage === 100
              ? 'var(--tertiary)'
              : 'var(--primary)',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.5rem',
        }}
      >
        {checks.map((check, index) => (
          <div
            key={index}
            style={{
              fontSize: '13px',
              padding: '0.4rem 0',
              color: check.ok
                ? 'var(--tertiary)'
                : 'var(--error)',
            }}
          >
            {check.ok ? '✓' : '⚠'} {check.label}
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: '1rem',
          fontSize: '12px',
          color: 'var(--on-surface-variant)',
        }}
      >
        Статус: <strong>{status}</strong>
      </div>
    </div>
  );
};

export default PreflightCheck;