import { useEffect, useState } from 'react'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Asterisk, ArrowRight, Play, X } from 'lucide-react'
import NavWorld from './components/Orb.jsx'

const works = [
  { no:'01', title:'Soft Hours', kind:'FILM / 2025', time:'01:24', image:'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1800&q=90', note:'A small film about the feeling of being somewhere else.' },
  { no:'02', title:'Blue, Almost', kind:'MUSIC VIDEO / 2025', time:'02:18', image:'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1800&q=90', note:'A study of water, memory, and the things between.' },
  { no:'03', title:'Nothing Ordinary', kind:'BRAND FILM / 2024', time:'00:54', image:'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1800&q=90', note:'Everyday rituals, seen from a slightly different angle.' },
  { no:'04', title:'Somewhere Out There', kind:'PERSONAL / 2024', time:'03:02', image:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=90', note:'A moving postcard from the edge of the familiar.' },
]
const nav = [{label:'Home',id:'home'},{label:'Works',id:'works'},{label:'About',id:'about'},{label:'Pricing',id:'pricing'},{label:'Contact',id:'contact'}]
function Eyebrow({children}) { return <p className="eyebrow"><span className="eyebrow-dot"/>{children}</p> }

export default function App() {
  const [active,setActive] = useState('home')
  const [selected,setSelected] = useState(null)
  const [menu,setMenu] = useState(false)
  const [emailCopied,setEmailCopied] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) setActive(entry.target.id) }), {rootMargin:'-35% 0px -55% 0px'})
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section))
    return () => observer.disconnect()
  },[])
  useEffect(() => {
    const onKey = e => { if(e.key==='Escape') { setSelected(null); setMenu(false) } }
    window.addEventListener('keydown',onKey); return () => window.removeEventListener('keydown',onKey)
  },[])
  const jump = id => { document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setMenu(false) }
  const copyEmail = async () => { try { await navigator.clipboard.writeText('hello@mammu.studio'); setEmailCopied(true); setTimeout(()=>setEmailCopied(false),1800) } catch { window.location.href='mailto:hello@mammu.studio' } }
  return <div className="site-shell">
    <header className="topbar">
      <NavWorld />
      <button className="brand" onClick={()=>jump('home')} aria-label="Mammu, back to home"><span className="brand-mark"><Asterisk size={19}/></span><span>mammu<span className="reg">®</span></span></button>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(item=><button key={item.id} onClick={()=>jump(item.id)} className={active===item.id?'nav-item is-active':'nav-item'}>{item.label}</button>)}</nav>
      <button className="availability" onClick={()=>jump('contact')}><span/>Available for projects <ArrowUpRight size={13}/></button>
      <button className="mobile-menu" onClick={()=>setMenu(!menu)} aria-label="Toggle navigation">{menu?<X size={19}/>:<span className="menu-lines">☰</span>}</button>
    </header>
    {menu&&<nav className="mobile-panel">{nav.map(item=><button key={item.id} onClick={()=>jump(item.id)}>{item.label}<ArrowUpRight size={16}/></button>)}</nav>}
    <main>
      <section id="home" className="hero section-wrap">
        <div className="hero-meta mono"><span>INDEPENDENT FILMMAKER</span><span>BASED IN INDONESIA · EVERYWHERE ELSE, TOO</span></div>
        <div className="hero-copy">
          <p className="hero-kicker reveal"><span className="tiny-star">✳</span> Moving images, made with feeling.</p>
          <h1 className="hero-title reveal">I make films<br/>that <span className="italic-word">feel</span><span className="period">.</span></h1>
          <div className="hero-bottom reveal">
            <p>Visual stories for people, places<br className="desktop-only"/> and things worth remembering.</p>
            <button className="round-link" onClick={()=>jump('works')} aria-label="Scroll to selected work"><ArrowDown size={19}/></button>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true"><span className="art-ring ring-one"/><span className="art-ring ring-two"/><span className="art-ring ring-three"/><span className="art-core"/><span className="art-label mono">A LITTLE LESS PERFECT<br/>A LITTLE MORE HUMAN</span></div>
        <div className="hero-foot mono"><span>SELECTED WORKS / 2024—25</span><span>SCROLL A LITTLE <ArrowDownRight size={12}/></span></div>
      </section>

      <section id="works" className="works section-wrap">
        <div className="section-heading"><div><Eyebrow>Things made with good people</Eyebrow><h2>A few <span className="italic-word">favourites.</span></h2></div><p className="heading-aside">Films, feelings, and the occasional happy accident.<br/>A small collection, always in progress.</p></div>
        <div className="work-grid">{works.map((work,i)=><button key={work.no} className={'work-card work-'+i} onClick={()=>setSelected(work)}><div className="work-image-wrap"><img src={work.image} alt={work.title} loading="lazy"/><span className="work-index mono">{work.no} / 04</span><span className="play-button"><Play size={14} fill="currentColor"/></span><span className="work-time mono">{work.time}</span></div><div className="work-info"><div><h3>{work.title}</h3><p className="mono">{work.kind}</p></div><ArrowUpRight size={17} className="work-arrow"/></div></button>)}</div>
        <div className="works-end mono"><span>MORE STORIES ARE BEING MADE</span><span>↘</span></div>
      </section>

      <section id="about" className="about section-wrap">
        <div className="about-top"><Eyebrow>A little about me</Eyebrow><span className="mono about-number">NOT A BIG STUDIO. JUST A BIG FEELING.</span></div>
        <div className="about-layout"><h2>Less of a formula.<br/><span className="italic-word">More of a feeling.</span></h2><div className="about-copy"><p className="about-lead">Hey, I’m Mammu — a filmmaker with a soft spot for imperfect things and stories that stay with you.</p><p>I work across brand films, music videos, and little experiments that don’t always fit into a box. I like natural light, honest moments, strange ideas, and making something that feels like a person made it.</p><p>No big production-house energy. Just thoughtful work, good conversations, and a camera pointed at something worth seeing.</p><button className="text-link" onClick={()=>jump('contact')}>Have a story? Tell me about it <ArrowUpRight size={15}/></button></div></div>
        <div className="about-stamp"><span>MADE SLOWLY</span><Asterisk size={22}/><span>FEEL SOMETHING</span><Asterisk size={22}/><span>STAY CURIOUS</span></div>
      </section>

      <section id="pricing" className="pricing section-wrap">
        <div className="pricing-top"><Eyebrow>Money talk, but make it easy</Eyebrow><span className="mono about-number">EVERY PROJECT IS A LITTLE DIFFERENT</span></div>
        <div className="pricing-layout"><div><h2>Good work.<br/><span className="italic-word">Fair energy.</span></h2><p className="pricing-intro">A rough starting point, not a one-size-fits-all menu. Tell me the idea and we’ll figure out what makes sense.</p></div><div className="price-list"><div className="price-row"><span className="mono">01 / SHORT FILM</span><strong>From $450</strong><span className="price-detail">A little story, beautifully told.</span></div><div className="price-row"><span className="mono">02 / BRAND FILM</span><strong>From $1,200</strong><span className="price-detail">A bigger picture for your brand.</span></div><div className="price-row"><span className="mono">03 / SOMETHING ELSE</span><strong>Let’s talk</strong><span className="price-detail">Custom projects, odd ideas, good things.</span></div><button className="text-link" onClick={()=>jump('contact')}>Get a project estimate <ArrowUpRight size={15}/></button></div></div>
      </section>

      <section id="contact" className="contact section-wrap">
        <div className="contact-scribble" aria-hidden="true">✳</div><Eyebrow>Have a good feeling about this?</Eyebrow><h2>Let’s make<br/><span className="italic-word">something real.</span></h2><p className="contact-note">A half-formed idea is more than enough to start.</p><a className="email-link" href="mailto:hello@mammu.studio">hello@mammu.studio <ArrowUpRight size={20}/></a><button className="copy-email" onClick={copyEmail}>{emailCopied?'Copied!':'or copy my email'}</button><div className="contact-bottom mono"><span>INDONESIA · AVAILABLE WORLDWIDE</span><span>NO BRIEF TOO WEIRD.</span></div>
      </section>
    </main>
    <footer className="footer"><button className="brand footer-brand" onClick={()=>jump('home')}><span className="brand-mark"><Asterisk size={17}/></span><span>mammu<span className="reg">®</span></span></button><span className="mono footer-note">MADE WITH CURIOSITY, NOT A TEMPLATE.</span><div className="footer-links"><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={12}/></a><a href="mailto:hello@mammu.studio">Email <ArrowUpRight size={12}/></a><a href="#terms" onClick={e=>{e.preventDefault();document.getElementById('terms')?.showModal()}}>TOS <ArrowUpRight size={12}/></a></div><span className="mono copyright">© {new Date().getFullYear()} MAMMU</span></footer>
    <dialog id="terms" className="terms-dialog"><button className="dialog-close" onClick={()=>document.getElementById('terms')?.close()} aria-label="Close terms"><X size={18}/></button><Eyebrow>The small print</Eyebrow><h2>Terms, simply.</h2><p>Each project is confirmed with a written scope, timeline, deliverables, and fee. Any deposit, revision rounds, cancellation terms, usage rights, and third-party costs will be outlined in the individual project agreement. Final work and usage rights are delivered according to that agreement and after agreed payments are complete.</p><p>This is a general summary, not legal advice. A signed project-specific agreement and applicable law take precedence. Questions? hello@mammu.studio.</p></dialog>
    {selected&&<div className="project-modal" role="dialog" aria-modal="true" aria-label={selected.title} onClick={()=>setSelected(null)}><div className="project-modal-inner" onClick={e=>e.stopPropagation()}><button className="dialog-close" onClick={()=>setSelected(null)} aria-label="Close project"><X size={19}/></button><img src={selected.image} alt={selected.title}/><div className="modal-caption"><div><p className="mono">{selected.kind} · {selected.time}</p><h2>{selected.title}</h2><p>{selected.note}</p></div><a href="mailto:hello@mammu.studio?subject=Let's%20make%20a%20film">Make something like this <ArrowUpRight size={15}/></a></div></div></div>}
  </div>
}
