document.addEventListener('DOMContentLoaded',()=>{
 const top=document.getElementById('topBtn');
 if(top){const update=()=>top.classList.toggle('show',scrollY>350);addEventListener('scroll',update,{passive:true});update();top.onclick=()=>scrollTo({top:0,behavior:'smooth'});}

 // Featured slider: mobile shows one card at a time.
 const featured=document.getElementById('featured');
 if(featured){const cards=[...featured.querySelectorAll('.event-item')],dots=document.getElementById('dots');let active=0;
  cards.forEach((_,i)=>{const b=document.createElement('button');b.setAttribute('aria-label',`عرض الفعالية ${i+1}`);b.onclick=()=>show(i);dots.appendChild(b)});
  function show(i){active=(i+cards.length)%cards.length;if(innerWidth<576)cards.forEach((c,n)=>c.classList.toggle('d-none',n!==active));[...dots.children].forEach((d,n)=>d.classList.toggle('active',n===active));}
  document.getElementById('next')?.addEventListener('click',()=>show(active+1));document.getElementById('prev')?.addEventListener('click',()=>show(active-1));addEventListener('resize',()=>{cards.forEach(c=>c.classList.remove('d-none'));show(active)});show(0);
 }

 // Search and filter events by text, category, month and location.
 const grid=document.getElementById('eventsGrid');
 if(grid){const items=[...grid.querySelectorAll('.event-item')],q=document.getElementById('q'),cat=document.getElementById('cat'),date=document.getElementById('date'),loc=document.getElementById('loc'),count=document.getElementById('count'),empty=document.getElementById('empty');
  const initial=new URLSearchParams(location.search).get('category');if(initial&&cat.querySelector(`option[value="${initial}"]`))cat.value=initial;
  function filter(){let n=0;items.forEach(el=>{const text=(el.dataset.title+' '+el.dataset.search+' '+el.textContent).toLocaleLowerCase('ar');const ok=(!q.value||text.includes(q.value.toLocaleLowerCase('ar').trim()))&&(!cat.value||el.dataset.category===cat.value)&&(!date.value||el.dataset.date.startsWith(date.value))&&(!loc.value||el.dataset.location===loc.value);el.classList.toggle('d-none',!ok);if(ok)n++});count.textContent=`عدد الفعاليات المطابقة: ${n}`;empty.classList.toggle('d-none',n!==0);}
  [q,cat,date,loc].forEach(x=>{x.addEventListener('input',filter);x.addEventListener('change',filter)});document.getElementById('search')?.addEventListener('click',filter);document.getElementById('reset')?.addEventListener('click',()=>{q.value=cat.value=date.value=loc.value='';filter()});filter();
 }

 // Shared data for all six sample event detail URLs.
 const data={
  '1':{title:'هاكاثون الابتكار الرقمي',category:'technology',categoryLabel:'تقنية وابتكار',date:'2026-11-05',dateLabel:'5 تشرين الثاني 2026',time:'10:00 صباحاً',start:'100000',end:'130000',location:'عبر الإنترنت',description:'تحدٍّ جماعي يعمل فيه الطلاب على ابتكار نموذج أولي لحل رقمي يعالج مشكلة واقعية، مع عرض الأفكار ومناقشة الحلول.',image:'photo-1516321318423-f06f85e504b3',gallery1:'photo-1519389950473-47ba0277781c',gallery2:'photo-1531482615713-2afd69097998'},
  '2':{title:'ورشة تطوير تطبيقات الويب باستخدام JavaScript',category:'technology',categoryLabel:'تقنية وابتكار',date:'2026-11-06',dateLabel:'6 تشرين الثاني 2026',time:'05:00 مساءً',start:'170000',end:'183000',location:'عبر الإنترنت',description:'ورشة تطبيقية يتعرّف فيها المشاركون إلى أساسيات JavaScript وكيفية استخدامها لإضافة التفاعل إلى صفحات الويب، من خلال أمثلة وتمارين بسيطة.',image:'photo-1498050108023-c5249f4df085',gallery1:'photo-1516321318423-f06f85e504b3',gallery2:'photo-1519389950473-47ba0277781c'},
  '3':{title:'الذكاء الاصطناعي ومستقبل سوق العمل',category:'technology',categoryLabel:'تقنية وابتكار',date:'2026-11-07',dateLabel:'7 تشرين الثاني 2026',time:'12:00 ظهراً',start:'120000',end:'133000',location:'عبر الإنترنت',description:'لقاء معرفي يستعرض تطبيقات الذكاء الاصطناعي وتأثيرها في المهن والمهارات المطلوبة، مع مساحة للنقاش حول فرص المستقبل وتحدياته.',image:'photo-1677442136019-21780ecad995',gallery1:'photo-1485827404703-89b55fcc595e',gallery2:'photo-1535223289827-42f1e9919769'},
  '4':{title:'معرض الكتاب والقراءة الرقمية',category:'culture',categoryLabel:'ثقافة ومعرفة',date:'2026-11-10',dateLabel:'10 تشرين الثاني 2026',time:'04:00 مساءً',start:'160000',end:'180000',location:'دمشق',description:'معرض ثقافي يعرّف بالكتب والمصادر الإلكترونية وطرق الوصول إلى المعرفة الرقمية، ويشجع الطلاب على القراءة وتبادل الترشيحات.',image:'photo-1507842217343-583bb7270b66',gallery1:'photo-1512820790803-83ca734da794',gallery2:'photo-1495446815901-a7297e633e8d'},
  '5':{title:'معرض التصوير الفوتوغرافي الجامعي',category:'arts',categoryLabel:'فنون وإبداع',date:'2026-11-12',dateLabel:'12 تشرين الثاني 2026',time:'11:00 صباحاً',start:'110000',end:'160000',location:'اللاذقية',description:'مساحة لعرض الصور التي يلتقطها الطلاب، وتسليط الضوء على تجاربهم الفنية وزواياهم المختلفة في توثيق الحياة اليومية والجامعية.',image:'photo-1452587925148-ce544e77e70d',gallery1:'photo-1516035069371-29a1b244cc32',gallery2:'photo-1500530855697-b586d89ba3ee'},
  '6':{title:'يوم الأنشطة الرياضية الجامعية',category:'sport',categoryLabel:'رياضة ونشاط',date:'2026-11-14',dateLabel:'14 تشرين الثاني 2026',time:'10:00 صباحاً',start:'100000',end:'130000',location:'حلب',description:'يوم مفتوح يتضمن أنشطة ومسابقات رياضية جماعية، ويشجع الطلاب على الحركة والتعاون وروح الفريق ضمن أجواء ودية.',image:'photo-1521412644187-c49fa049e84d',gallery1:'photo-1517649763962-0c623066013b',gallery2:'photo-1531415074968-036ba1b575da'}
 };
 const title=document.getElementById('detailTitle');
 if(title){const d=data[new URLSearchParams(location.search).get('id')||'1']||data['1'];
  title.textContent=d.title;document.getElementById('titleHero').textContent=d.title;
  const tag=document.getElementById('detailTag');tag.textContent=d.categoryLabel;tag.className='badge tag-'+d.category;
  document.getElementById('detailDate').textContent=d.dateLabel;document.getElementById('detailTime').textContent=d.time;document.getElementById('detailLoc').textContent=d.location;document.getElementById('mapLoc').textContent=d.location;document.getElementById('desc').textContent=d.description;
  const online=d.location==='عبر الإنترنت';document.getElementById('mapHeading').textContent=online?'طريقة الحضور':'الموقع على الخريطة';document.getElementById('mapNote').textContent=online?'فعالية افتراضية لا تتطلب الحضور إلى موقع جغرافي.':'تمثيل توضيحي ثابت وليس خريطة مباشرة.';
  const imageUrl=id=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`;
  const img=document.getElementById('detailImg');img.src=imageUrl(d.image);img.alt=d.title;document.title=d.title+' | دليل الفعاليات';
  const gallery1=document.getElementById('gallery1'),gallery2=document.getElementById('gallery2');
  if(gallery1){gallery1.src=`https://images.unsplash.com/${d.gallery1}?auto=format&fit=crop&w=700&q=80`;gallery1.alt='صورة مرتبطة بفعالية '+d.title;}
  if(gallery2){gallery2.src=`https://images.unsplash.com/${d.gallery2}?auto=format&fit=crop&w=700&q=80`;gallery2.alt='صورة إضافية لفعالية '+d.title;}
  document.getElementById('calendar').onclick=()=>{const day=d.date.replaceAll('-',''),start=day+'T'+d.start,end=day+'T'+d.end;const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//BWP401 Event Guide//AR','BEGIN:VEVENT',`DTSTART:${start}`,`DTEND:${end}`,`SUMMARY:${d.title}`,`LOCATION:${d.location}`,`DESCRIPTION:${d.description}`,'END:VEVENT','END:VCALENDAR'].join('\r\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));a.download='event.ics';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);document.getElementById('actionMsg').textContent='تم تجهيز ملف تقويم تجريبي بالتاريخ والوقت الصحيحين للتنزيل.';};
  document.getElementById('share').onclick=async()=>{try{if(navigator.share)await navigator.share({title:d.title,url:location.href});else if(navigator.clipboard&&isSecureContext){await navigator.clipboard.writeText(location.href);document.getElementById('actionMsg').textContent='تم نسخ رابط الفعالية.';}else prompt('انسخ رابط الفعالية',location.href)}catch(e){if(e.name!=='AbortError')document.getElementById('actionMsg').textContent='انسخ الرابط من شريط العنوان للمشاركة.'}};
 }

 // Front-end validation only; this static form does not send an email.
 const form=document.getElementById('contactForm');
 if(form){const alert=document.getElementById('alert'),name=document.getElementById('name'),email=document.getElementById('email'),message=document.getElementById('message');form.addEventListener('submit',e=>{e.preventDefault();[name,email,message].forEach(x=>x.classList.toggle('is-invalid',!x.checkValidity()));alert.classList.remove('d-none','alert-success','alert-danger');if(!form.checkValidity()){alert.classList.add('alert-danger');alert.textContent='يرجى تصحيح الحقول المحددة قبل المتابعة.';form.querySelector(':invalid')?.focus();return}alert.classList.add('alert-success');alert.textContent=`شكراً ${name.value.trim()}، تم التحقق من البيانات بنجاح. هذا نموذج تجريبي ولا يرسل بريداً فعلياً.`;form.reset();[name,email,message].forEach(x=>x.classList.remove('is-invalid'))});[name,email,message].forEach(x=>x.addEventListener('input',()=>{if(x.checkValidity())x.classList.remove('is-invalid')}));}
});
