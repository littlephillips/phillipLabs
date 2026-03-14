export default function CheckIcon({ color = "#d4874a" }) {
  return (
    <span style={{
      flexShrink:0, width:18, height:18, borderRadius:"50%",
      background:`${color}16`, border:`1.5px solid ${color}44`,
      display:"flex", alignItems:"center", justifyContent:"center",
      marginTop:1,
      boxShadow:`0 2px 6px ${color}22`,
    }}>
      <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
        <path d="M1.5 5L3.8 7.5L8.5 2.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
}
