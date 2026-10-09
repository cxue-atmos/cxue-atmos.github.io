---
layout: null
sitemap: false
---
(() => {
    const papers = {{ site.data.academic_publications | jsonify }};
    const requestedLanguage = new URLSearchParams(location.search).get('lang');
    let lang = ['en','zh'].includes(requestedLanguage) ? requestedLanguage : (document.body.dataset.language || 'en');
    document.getElementById('language').hidden = false;
    const main = document.getElementById('main');
    const escape = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    const roleMap = {'第一作者':'First author','共同第一作者':'Co-first author','共同通讯作者':'Co-corresponding author','通讯作者':'Corresponding author','唯一作者':'Sole author'};
    const t = (en,zh) => lang === 'en' ? en : zh;
    const external = 'target="_blank" rel="noopener noreferrer"';
    function pub(p, compact=false) {
      const type = p.kind === 'viewpoint' ? t('Viewpoint','观点文章') : p.kind === 'data' ? t('Data paper','数据论文') : p.kind === 'editorial' ? t('Editorial','社论') : t('Research article','研究论文');
      const roles = p.roles.map(r=>lang==='en'?roleMap[r]:r).join(' · ');
      const authors = p.authors.map(a=>/^(Chaoyang Xue|薛朝阳)$/i.test(a)?`<strong>${escape(a)}</strong>`:escape(a)).join('; ');
      const citation = [p.journal, [p.volume,p.pages].filter(Boolean).join(', ')].filter(Boolean).join(' · ');
      const summary = p.hasSummary ? `<div class="pub-summary">${p[lang].map(s=>`<p>${escape(s)}</p>`).join('')}</div>` : '';
      const publisher = p.publisherUrl || 'https://doi.org/'+p.doi;
      const links = `<a href="${escape(publisher)}" ${external}>${t('Journal page','期刊页面')} ↗</a><a href="https://doi.org/${escape(p.doi)}" ${external}>DOI ↗</a>${p.abstractUrl?`<a href="${escape(p.abstractUrl)}" ${external}>${t('PubMed abstract','PubMed 摘要')} ↗</a>`:''}`;
      return `<article class="pub"><div class="pub-year">${p.year}</div><div>${roles?`<div class="role">${escape(roles)}<span class="type">${type}</span></div>`:(p.kind==='editorial'?`<div class="role">${type}</div>`:'')}<h3><a href="${escape(publisher)}" ${external}>${escape(p.title)}</a></h3>${compact?'':`<p class="authors" style="margin:0 0 7px;max-width:none">${authors}</p>`}<p class="pub-meta">${escape(citation).replace(/-/g,'–')}</p>${summary}<div class="pub-links">${links}</div></div></article>`;
    }
    function home() {
      return `<section class="hero"><p class="eyebrow">${t('ATMOSPHERIC CHEMISTRY · BIOSPHERE–ATMOSPHERE EXCHANGE','大气化学 · 生物圈—大气交换')}</p><h1>${t('Understanding chemistry<br>at the <em>Earth–air interface.</em>','探索地表与大气之间的<br><em>化学过程。</em>')}</h1><p class="intro">${t('I am a Professor at the <b>Institute of Atmospheric Physics, Chinese Academy of Sciences</b>. My research explores how reactive nitrogen and biosphere–atmosphere exchange influence atmospheric oxidation, air quality, and climate.','我是薛朝阳，中国科学院大气物理研究所研究员。我的研究关注活性氮化学与生物圈—大气交换，探索这些过程如何影响大气氧化能力、空气质量和气候。')}</p><p class="intro">${t('I combine field observations, laboratory experiments, and atmospheric modeling, with a focus on HONO sources, surface exchange, and the development of atmospheric measurement systems.','通过野外观测、实验室实验与大气模型，研究 HONO 来源及地表交换过程，并开发和应用大气成分与通量测量系统。')}</p><div class="hero-actions"><a href="/publications/" class="primary-link">${t('Explore publications','查看研究论文')} <span>↗</span></a><a href="/research/" class="text-link">${t('Research interests','研究方向')} →</a></div></section>
      <div class="research-strip"><div><span class="num">01</span><h3>${t('Reactive nitrogen','活性氮化学')}</h3><p>${t('HONO sources, transformations, and atmospheric oxidation.','HONO 来源、转化过程与大气氧化。')}</p></div><div><span class="num">02</span><h3>${t('Biosphere–atmosphere exchange','生物圈—大气交换')}</h3><p>${t('Chemical exchange across soils, ecosystems, and the atmosphere.','土壤、生态系统与大气之间的化学交换。')}</p></div><div><span class="num">03</span><h3>${t('Measurements & modeling','观测与模型')}</h3><p>${t('Instruments and field observations that constrain atmospheric chemistry.','用仪器研发和外场观测约束大气化学过程。')}</p></div></div>
      <section><div class="section-heading"><h2>${t('Recent publications','近期论文')}</h2><a href="/publications/">${t('All publications','全部论文')} →</a></div>${papers.slice(0,3).map(p=>pub(p,true)).join('')}</section>`;
    }
    function publications() {
      const years = [...new Set(papers.map(p=>p.year))];
      let lastYear;
      return `<div class="page-heading"><p class="eyebrow">${t('PUBLICATIONS','研究成果')}</p><h1>${t('Publications','学术论文')}</h1><p>${t('All publications in reverse chronological order. First- and corresponding-author papers, including shared authorship, include brief summaries.','全部论文按发表时间倒序排列。一作与通讯论文（含共同署名）附简短概括。')}</p><div class="year-nav">${years.map(y=>`<a href="/publications/#year-${y}">${y}</a>`).join('')}</div></div>${papers.map(p=>{const heading=lastYear!==p.year?`<h2 class="pub-year-heading" id="year-${p.year}">${p.year}</h2>`:'';lastYear=p.year;return heading+pub(p);}).join('')}`;
    }
    const themes = [
      ['HONO & reactive nitrogen chemistry','HONO 与活性氮化学','Understanding the sources, sinks, and chemical transformations of HONO and other reactive nitrogen species, and how they influence radical production and secondary pollution.','解析 HONO 及其他活性氮物种的来源、汇与化学转化，研究其对自由基生成和二次污染的影响。'],
      ['Biosphere–atmosphere exchange','生物圈—大气交换','Investigating trace-gas exchange across agricultural soils, forests, and marine environments, linking ecosystem processes to atmospheric composition.','研究农田土壤、森林及海洋环境中的痕量气体交换，建立生态系统过程与大气成分变化之间的联系。'],
      ['Atmospheric oxidation & air quality','大气氧化与空气质量','Combining observations and chemical models to understand OH, HONO, H₂O₂, and NO₃ chemistry and their roles in ozone and aerosol formation.','结合观测和化学模型，研究 OH、HONO、H₂O₂ 与 NO₃ 化学及其在臭氧和气溶胶形成中的作用。'],
      ['Instruments & field observations','仪器研发与野外观测','Developing and applying ambient and flux measurement systems across ground-based, airborne, and shipborne platforms to constrain atmospheric processes.','开发和应用大气成分与通量测量系统，利用地面、机载和船载平台观测约束大气过程。']
    ];
    function research() {
      return `<div class="page-heading"><p class="eyebrow">${t('RESEARCH','研究方向')}</p><h1>${t('From surface exchange<br>to atmospheric chemistry.','从地表交换<br>到大气化学。')}</h1><p>${t('Field observations, laboratory experiments, and atmospheric modeling.','野外观测、实验室实验与大气模型相结合。')}</p></div>${themes.map((r,i)=>`<section class="research-item"><span class="num">0${i+1}</span><div><h2>${t(r[0],r[1])}</h2><p>${t(r[2],r[3])}</p></div></section>`).join('')}<section class="platforms"><h2>${t('Platforms & field campaigns','观测平台与外场研究')}</h2><div class="platform"><div><a href="https://www.attoproject.org/about-atto/" ${external}>Amazon Tall Tower Observatory ↗</a><span>${t('Amazon rainforest','亚马孙热带雨林')}</span></div><div><a href="https://across.aeris-data.fr/" ${external}>ACROSS ↗</a><span>${t('Forest atmospheric chemistry · France','森林大气化学 · 法国')}</span></div><div><a href="https://www.mpic.de/4224334/sy-eugen-seibold" ${external}>S/Y Eugen Seibold ↗</a><span>${t('Ocean–atmosphere observations','海洋—大气观测')}</span></div><div><a href="https://www.ldf.uni-hamburg.de/en/meteor.html" ${external}>R/V Meteor ↗</a><span>${t('Marine research vessel','海洋科学考察船')}</span></div></div></section>`;
    }
    function cvRow(date,title,description){return `<div class="cv-row"><div class="date">${date}</div><div><h3>${title}</h3><p>${description}</p></div></div>`;}
    function cv() {
      return `<div class="page-heading"><p class="eyebrow">${t('CURRICULUM VITAE','个人简历')}</p><h1>${t('Experience & education','工作与教育经历')}</h1><p>${t('Prof. Dr. Chaoyang Xue · Atmospheric chemistry','薛朝阳 · 大气化学')}</p></div><section class="cv-section"><h2>${t('Appointments','工作经历')}</h2>${cvRow(t('2026–present','2026–至今'),t('Institute of Atmospheric Physics, Chinese Academy of Sciences','中国科学院大气物理研究所'),t('Professor · Beijing, China','研究员 · 中国北京'))}${cvRow('2023–2026',t('Max Planck Institute for Chemistry','马克斯·普朗克化学研究所'),t('Humboldt / Marie Curie Research Fellow · Mainz, Germany','洪堡／玛丽居里学者 · 德国美因茨'))}${cvRow('2020–2022','LPC2E–CNRS',t('Labex-Voltaire Research Fellow · Orléans, France','Labex-Voltaire 学者 · 法国奥尔良'))}</section><section class="cv-section"><h2>${t('Education','教育经历')}</h2>${cvRow('2014–2020',t('International Dual Ph.D. in Atmospheric Chemistry','大气化学联合博士'),t('LPC2E–CNRS, France & RCEES–CAS, China','LPC2E–CNRS（法国）与中国科学院生态环境研究中心'))}${cvRow('2010–2014',t('B.Sc. in Environmental Science','环境科学学士'),t('China University of Petroleum, Beijing','中国石油大学（北京）'))}</section><section class="cv-section"><h2>${t('Fellowships','学术资助')}</h2><ul class="funding"><li>Marie Skłodowska-Curie Actions</li><li>Alexander von Humboldt Fellowship</li><li>Labex-Voltaire Fellowship</li></ul></section>`;
    }
    function render(scroll=true) {
      const hash=location.hash.slice(1);
      const initialRoute=document.body.dataset.route || 'home';
      const route=hash.startsWith('publications')?'publications':(['home','research','cv'].includes(hash)?hash:initialRoute);
      document.documentElement.lang=lang==='en'?'en':'zh-CN';
      const labels=lang==='en'?['About','Research','Publications','CV']:['关于','研究方向','论文','简历'];
      document.querySelectorAll('nav [data-route]').forEach((a,i)=>{a.textContent=labels[i];a.classList.toggle('active',a.dataset.route===route);if(a.dataset.route===route)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
      document.getElementById('language').textContent=t('中文','EN');
      document.getElementById('language').setAttribute('aria-label',t('Switch to Chinese','切换为英文'));
      document.getElementById('position').textContent=t('Professor','研究员');
      document.getElementById('affiliation').innerHTML=t('Institute of Atmospheric Physics<br>Chinese Academy of Sciences','中国科学院<br>大气物理研究所');
      document.getElementById('location').textContent=t('Beijing, China','中国 · 北京');
      document.getElementById('footer-affiliation').textContent=t('Institute of Atmospheric Physics, Chinese Academy of Sciences','中国科学院大气物理研究所');
      main.innerHTML=({home,publications,research,cv})[route]();
      document.querySelectorAll('a[href^="/"]').forEach(a=>{
        const url=new URL(a.getAttribute('href'),location.origin);
        if(lang==='zh')url.searchParams.set('lang','zh');else url.searchParams.delete('lang');
        a.setAttribute('href',url.pathname+url.search+url.hash);
      });
      document.title=t('Prof. Dr. Chaoyang Xue','薛朝阳')+' | '+labels[['home','research','publications','cv'].indexOf(route)];
      const yearMatch=hash.match(/^(?:publications-|year-)(\d{4})$/);
      if(yearMatch){requestAnimationFrame(()=>document.getElementById('year-'+yearMatch[1])?.scrollIntoView());}
      else if(scroll)window.scrollTo(0,0);
    }
    document.getElementById('language').addEventListener('click',()=>{lang=lang==='en'?'zh':'en';const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(null,'',url);render(false);});
    window.addEventListener('hashchange',()=>render());
    render(false);
  })();
