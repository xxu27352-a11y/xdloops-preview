const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('[data-resume]').forEach(b=>b.addEventListener('click',()=>document.querySelector('#resume-dialog').showModal()));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelectorAll('.close,.dialog-dismiss').forEach(b=>b.addEventListener('click',()=>dialog.close()));dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});dialog.addEventListener('close',()=>{document.body.style.overflow='';});new MutationObserver(()=>{if(dialog.open)document.body.style.overflow='hidden';}).observe(dialog,{attributes:true,attributeFilter:['open']});});
document.querySelector('#contact-button').addEventListener('click',()=>{const message=document.querySelector('#contact-message');message.hidden=false;message.scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'nearest'});});
document.querySelector('#download-resume').addEventListener('click',()=>{const content='XDLOOPS — 简历资料模板\n\n姓名：XDLOOPS\n职业：VJ / 现场视觉\n\n个人简介：[待补充]\n项目与工作经历：ONER 男团演唱会开场 — AI 影像制作、动画制作\n技能与创作工具：[待补充]\n教育经历：[待补充]\n邮箱：[待补充]\n社交主页：[待补充]\n作品链接：[待补充]\n\n本文件是待完善的资料模板，并非完整求职简历。\n';const url=URL.createObjectURL(new Blob(['\ufeff'+content],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='XDLOOPS-简历资料模板.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
document.querySelector('#year').textContent=new Date().getFullYear();

const preview=document.querySelector('#hero-preview');
if(preview){
 const button=document.querySelector('#hero-play');
 let manuallyPaused=false;
 preview.autoplay=true;preview.loop=true;preview.muted=true;
 function sync(){button.textContent=preview.paused?'播放预览 ▷':'暂停预览 Ⅱ';button.setAttribute('aria-pressed',String(!preview.paused));}
 async function play(){if(!preview.getAttribute('src'))preview.src=preview.dataset.src;try{await preview.play();}catch{}sync();}
 button.addEventListener('click',()=>{manuallyPaused=!preview.paused;if(manuallyPaused)preview.pause();else play();});
 preview.addEventListener('play',sync);preview.addEventListener('pause',sync);preview.addEventListener('error',()=>{button.textContent='预览暂不可用';button.disabled=true;});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)preview.pause();else if(!manuallyPaused)play();});
 window.addEventListener('pageshow',()=>{if(!manuallyPaused)play();});
 preview.addEventListener('ended',()=>{if(!manuallyPaused){preview.currentTime=0;play();}});
 play();
}
const gallery=[...document.querySelectorAll('[data-gallery]')], imageDialog=document.querySelector('#image-dialog');
if(imageDialog){
 let current=0;
 const picture=document.querySelector('#lightbox-image'),stage=imageDialog.querySelector('.lightbox-stage'),zoom=document.querySelector('#image-zoom');
 function resetZoom(){imageDialog.classList.remove('is-zoomed');zoom.textContent='放大细节 ＋';zoom.setAttribute('aria-pressed','false');stage.scrollTop=0;stage.scrollLeft=0;}
 function show(index){current=(index+gallery.length)%gallery.length;const button=gallery[current];picture.src=((imageDialog.dataset.assetRoot||'assets/oner')+'/'+button.dataset.gallery+'-full.webp').replaceAll('/','-');picture.alt=button.querySelector('img').alt;document.querySelector('#image-title').textContent=button.dataset.title;document.querySelector('#image-count').textContent=(current+1)+' / '+gallery.length;resetZoom();}
 gallery.forEach((button,i)=>button.addEventListener('click',()=>{show(i);imageDialog.showModal();}));
 document.querySelector('#image-prev').addEventListener('click',()=>show(current-1));document.querySelector('#image-next').addEventListener('click',()=>show(current+1));
 imageDialog.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();show(current-1);}if(e.key==='ArrowRight'){e.preventDefault();show(current+1);}});
 zoom.addEventListener('click',()=>{const on=imageDialog.classList.toggle('is-zoomed');zoom.setAttribute('aria-pressed',String(on));zoom.textContent=on?'适应屏幕 −':'放大细节 ＋';});
 imageDialog.addEventListener('close',resetZoom);
}

const archiveVideos=[...document.querySelectorAll('[data-archive-video]')];archiveVideos.forEach(v=>v.addEventListener('play',()=>archiveVideos.forEach(other=>{if(other!==v)other.pause();})));
