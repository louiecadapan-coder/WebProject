
// reservation.js - simple seat picker simulation
document.addEventListener('DOMContentLoaded', ()=>{
  const seatContainer = document.getElementById('seat-map');
  if(!seatContainer) return;
  const rows = 3, cols = 4;
  const reserved = [2,5]; // placeholder reserved seat ids
  for(let r=0;r<rows;r++){
    const row = document.createElement('div');
    row.style.display='flex'; row.style.gap='12px'; row.style.marginBottom='12px';
    for(let c=0;c<cols;c++){
      const id = r*cols + c + 1;
      const btn = document.createElement('button');
      btn.textContent = 'Table ' + id;
      btn.dataset.id = id;
      btn.style.padding='10px 14px'; btn.style.borderRadius='10px';
      btn.style.border='none';
      btn.style.cursor='pointer';
      if(reserved.includes(id)){ btn.style.background='#ddd'; btn.disabled=true; }
      else { btn.style.background='#A8C686'; btn.onclick = ()=> selectSeat(btn); }
      row.appendChild(btn);
    }
    seatContainer.appendChild(row);
  }
});

function selectSeat(btn){
  const sel = document.querySelector('.seat-selected');
  if(sel) sel.classList.remove('seat-selected');
  btn.classList.add('seat-selected');
  btn.style.boxShadow='0 6px 14px rgba(78,108,80,0.2)';
  // show simple modal confirmation
  const name = prompt('Enter your name for reservation:');
  if(name){
    alert(`Reservation confirmed for ${name} at ${btn.textContent}.`);
    btn.style.background='#ddd'; btn.disabled=true;
  } else {
    btn.classList.remove('seat-selected');
    btn.style.boxShadow='';
  }
}
