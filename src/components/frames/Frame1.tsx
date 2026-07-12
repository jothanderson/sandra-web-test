import Image from 'next/image';

export default function Frame1_Question() {
  return (
    <section 
      style={{ 
        position: 'relative', 
        height: '100vh', 
        width: '100%', 
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-black)'
      }}
    >
      <div style={{ position: 'absolute', inset: 0, opacity: 0.6 }}>
        <Image 
          src="/photos/CALAIS_01.jpg" 
          alt="Observation detail" 
          fill 
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
      
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <h1 style={{ color: 'var(--color-white)', textAlign: 'center' }}>
          Every story begins with a question.
        </h1>
      </div>

      <div className="red-thread-placeholder" style={{ bottom: 0, height: '30vh' }}></div>
    </section>
  );
}
