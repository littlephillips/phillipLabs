import { waMsg } from "../data/constants";

export default function FloatingWhatsApp() {
  return (
    <a
      href={waMsg("Hi Phillip! I'm interested in building a website.")}
      target="_blank" rel="noopener noreferrer"
      title="Chat on WhatsApp"
      style={{
        position:"fixed", bottom:28, right:28, zIndex:500,
        width:56, height:56, borderRadius:"50%",
        background:"#097e34",
        display:"flex", alignItems:"center", justifyContent:"center",
        textDecoration:"none", color:"#fff",
        boxShadow:"0 2px 0 rgba(255,255,255,0.2) inset,0 -2px 0 rgba(0,0,0,0.25) inset,0 8px 28px rgba(37,211,102,0.45)",
        transition:"transform 0.25s,box-shadow 0.25s",
      }}
      onMouseEnter={e=>{
        e.currentTarget.style.transform="scale(1.12) translateY(-2px)";
        e.currentTarget.style.boxShadow="0 2px 0 rgba(255,255,255,0.22) inset,0 -2px 0 rgba(0,0,0,0.28) inset,0 14px 40px rgba(37,211,102,0.6)";
      }}
      onMouseLeave={e=>{
        e.currentTarget.style.transform="scale(1) translateY(0)";
        e.currentTarget.style.boxShadow="0 2px 0 rgba(255,255,255,0.2) inset,0 -2px 0 rgba(0,0,0,0.25) inset,0 8px 28px rgba(37,211,102,0.45)";
      }}
    >
      <svg width="26" height="26" viewBox="0 0 175.216 175.552" fill="currentColor">
        <path d="M87.6 0C39.3 0 0 39.3 0 87.6c0 15.5 4.1 30.2 11.3 43L0 175.6l46.5-11.2c12.4 6.5 26.5 10.2 41.1 10.2 48.3 0 87.6-39.3 87.6-87.6C175.2 39.3 135.9 0 87.6 0zm0 160.3c-13.6 0-26.4-3.7-37.3-10.2l-2.7-1.6-27.7 7 7.3-26.9-1.7-2.8C18.7 115.2 15 101.7 15 87.6 15 47.5 47.5 15 87.6 15c40.1 0 72.6 32.5 72.6 72.6 0 40.1-32.5 72.7-72.6 72.7z"/>
        <path d="M127.8 105.7c-2.1-1-12.4-6.1-14.3-6.8-1.9-.7-3.3-1-4.7.9-1.4 1.9-5.4 6.8-6.6 8.2-1.2 1.4-2.4 1.6-4.5.5-2.1-1-8.8-3.2-16.8-10.3-6.2-5.5-10.4-12.3-11.6-14.4-1.2-2.1-.1-3.2.9-4.2.9-.9 2.1-2.4 3.1-3.6 1-1.2 1.4-2.1 2.1-3.5.7-1.4.4-2.6-.2-3.7-.5-1-4.7-11.3-6.4-15.5-1.7-4.1-3.4-3.5-4.7-3.6-.6-.1-2-.1-4-.1s-4.9.8-7 2.9c-2.1 2.1-8 7.8-8 19 0 11.2 8.1 22.1 9.3 23.6 1.2 1.5 15.9 24.3 38.6 34.1 5.4 2.3 9.6 3.7 12.9 4.7 5.4 1.7 10.3 1.5 14.2.9 4.3-.7 13.3-5.4 15.2-10.7 1.9-5.2 1.9-9.7 1.3-10.6-.5-.9-2-1.5-4.1-2.5z"/>
      </svg>
    </a>
  );
}
