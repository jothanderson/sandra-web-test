export default function Frame4_MapOfStories() {
  return (
    <section 
      style={{ 
        position: 'relative', 
        height: '100vh',
        width: '100%',
        backgroundColor: '#111'
      }}
    >
      <div className="map-placeholder">
        <h2 style={{ color: 'var(--color-gray-light)' }}>[ Interactive Mapbox Area ]</h2>
        
        <div style={{ 
          position: 'absolute', 
          top: '20%', 
          left: '5%', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 'var(--spacing-sm)' 
        }}>
          <h3 style={{ color: 'var(--color-white)', fontSize: '1.5rem', marginBottom: '1rem' }}>Emotions</h3>
          <button style={{ background: 'transparent', color: 'var(--color-white)', border: '1px solid var(--color-white)', padding: '0.5rem 1rem', cursor: 'pointer', textAlign: 'left' }}>Despair</button>
          <button style={{ background: 'transparent', color: 'var(--color-white)', border: '1px solid var(--color-white)', padding: '0.5rem 1rem', cursor: 'pointer', textAlign: 'left' }}>Survival</button>
          <button style={{ background: 'transparent', color: 'var(--color-white)', border: '1px solid var(--color-white)', padding: '0.5rem 1rem', cursor: 'pointer', textAlign: 'left' }}>Resistance</button>
          <button style={{ background: 'transparent', color: 'var(--color-white)', border: '1px solid var(--color-white)', padding: '0.5rem 1rem', cursor: 'pointer', textAlign: 'left' }}>Dignity</button>
          <button style={{ background: 'transparent', color: 'var(--color-white)', border: '1px solid var(--color-white)', padding: '0.5rem 1rem', cursor: 'pointer', textAlign: 'left' }}>Hope</button>
        </div>
      </div>
    </section>
  );
}
