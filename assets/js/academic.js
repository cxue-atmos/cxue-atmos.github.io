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
      const links = `<a href="${escape(publisher)}" ${external}>${/\.pdf(?:[?#]|$)/i.test(publisher)?t('Journal PDF','期刊全文 PDF'):t('Journal page','期刊页面')} ↗</a><a href="https://doi.org/${escape(p.doi)}" ${external}>DOI ↗</a>${p.abstractUrl?`<a href="${escape(p.abstractUrl)}" ${external}>${t('PubMed abstract','PubMed 摘要')} ↗</a>`:''}`;
      return `<article class="pub"><div class="pub-year">${p.year}</div><div>${roles?`<div class="role">${escape(roles)}<span class="type">${type}</span></div>`:(p.kind==='editorial'?`<div class="role">${type}</div>`:'')}<h3><a href="${escape(publisher)}" ${external}>${escape(p.title)}</a></h3>${compact?'':`<p class="authors" style="margin:0 0 7px;max-width:none">${authors}</p>`}<p class="pub-meta">${escape(citation).replace(/-/g,'–')}</p>${summary}<div class="pub-links">${links}</div></div></article>`;
    }
    function home() {
      return `<section class="hero"><p class="eyebrow">${t('ATMOSPHERIC CHEMISTRY · SURFACE–ATMOSPHERE EXCHANGE','大气化学 · 地表—大气交换')}</p><h1>${t('Understanding the exchanges<br>that shape <em>our atmosphere.</em>','探索塑造大气环境的<br><em>交换过程。</em>')}</h1><p class="intro">${t('I am a Professor at the <b>Institute of Atmospheric Physics, Chinese Academy of Sciences</b>. My research explores how trace gases are exchanged between Earth’s surface and the atmosphere, and how these processes influence atmospheric chemistry, air quality, and climate.','我是薛朝阳，现任<b>中国科学院大气物理研究所</b>研究员。我的研究关注痕量气体在地表与大气之间的交换过程，以及这些过程对大气化学、空气质量和气候的影响。')}</p><p class="intro">${t('My group investigates reactive nitrogen, greenhouse gases, and their interactions across terrestrial and marine environments. We combine field observations, laboratory experiments, instrument development, and atmospheric modeling with artificial intelligence and machine learning (AI/ML) to understand the processes connecting surface exchange, atmospheric composition, and environmental change.','课题组研究陆地和海洋环境中的活性氮、温室气体及其相互作用。我们综合运用外场观测、实验室实验、仪器研发、大气模型模拟，以及人工智能与机器学习（AI/ML）方法，探索连接地表交换、大气成分与环境变化的关键过程。')}</p><p class="lab-affiliation"><strong>${t('State Key Laboratory of Atmospheric Environment and Extreme Meteorology (AEEM)','大气环境与极端气象全国重点实验室（AEEM）')}</strong><span>${t('Director: ','实验室主任：')}<a href="https://iap.cas.cn/sourcedb/zw/gbzjrc/zg2020/202311/t20231120_6992773.html" ${external}>${t('Prof. Hang Su','苏杭研究员')} ↗</a></span></p><div class="hero-actions"><a href="/publications/" class="primary-link">${t('Explore publications','查看研究论文')} <span>↗</span></a><a href="/research/" class="text-link">${t('Research interests','研究方向')} →</a></div></section>
      <div class="research-strip"><div><span class="num">01</span><h3>${t('Trace gases','痕量气体')}</h3><p>${t('Reactive nitrogen, greenhouse gases, and their interactions.','活性氮、温室气体及其相互作用。')}</p></div><div><span class="num">02</span><h3>${t('Surface–atmosphere exchange','地表—大气交换')}</h3><p>${t('Trace-gas exchange across terrestrial and marine environments.','陆地和海洋环境中的痕量气体交换。')}</p></div><div><span class="num">03</span><h3>${t('Research methods','研究方法')}</h3><p>${t('Field observations, laboratory experiments, instrument development, atmospheric modeling, and AI/ML.','外场观测、实验室实验、仪器研发、大气模型模拟与人工智能和机器学习（AI/ML）。')}</p></div></div>
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
    const collaborationCountries = [
  {
    "id": "germany",
    "en": "Germany",
    "zh": "德国",
    "code": "DE",
    "institutions": [
      {
        "short": "MPIC",
        "en": "Max Planck Institute for Chemistry",
        "zh": "马克斯·普朗克化学研究所",
        "url": "https://www.mpic.de/3537696/about-us"
      },
      {
        "short": "TROPOS",
        "en": "Leibniz Institute for Tropospheric Research",
        "zh": "莱布尼茨对流层研究所",
        "url": "https://www.tropos.de/en/"
      },
      {
        "short": "GEOMAR",
        "en": "GEOMAR Helmholtz Centre for Ocean Research Kiel",
        "zh": "亥姆霍兹基尔海洋研究中心",
        "url": "https://www.geomar.de/en/"
      },
      {
        "short": "Oldenburg",
        "en": "Carl von Ossietzky University of Oldenburg",
        "zh": "奥尔登堡大学",
        "url": "https://uol.de/en"
      },
      {
        "short": "Wuppertal",
        "en": "University of Wuppertal",
        "zh": "伍珀塔尔大学",
        "url": "https://www.uni-wuppertal.de/en/"
      },
      {
        "short": "Rostock",
        "en": "University of Rostock",
        "zh": "罗斯托克大学",
        "url": "https://www.uni-rostock.de/en/"
      }
    ]
  },
  {
    "id": "france",
    "en": "France",
    "zh": "法国",
    "code": "FR",
    "institutions": [
      {
        "short": "LPC2E-CNRS",
        "en": "Laboratory of Physics and Chemistry of the Environment and Space",
        "zh": "法国国家科学研究中心环境与空间物理化学实验室",
        "url": "https://www.lpc2e.cnrs.fr/"
      },
      {
        "short": "LISA",
        "en": "Laboratoire Interuniversitaire des Systèmes Atmosphériques",
        "zh": "大学联合大气系统实验室",
        "url": "https://www.u-pec.fr/fr/recherche/laboratoires/laboratoire-interuniversitaire-des-systemes-atmospheriques-lisa-umr-7583"
      },
      {
        "short": "Orléans",
        "en": "University of Orléans",
        "zh": "奥尔良大学",
        "url": "https://www.univ-orleans.fr/en"
      },
      {
        "short": "ICARE-CNRS",
        "en": "Institute of Combustion, Aerothermics, Reactivity and Environment",
        "zh": "法国国家科学研究中心燃烧、气动热力学、反应与环境研究所",
        "url": "https://icare.cnrs.fr/"
      },
      {
        "short": "CNRM",
        "en": "National Centre for Meteorological Research",
        "zh": "法国国家气象研究中心",
        "url": "https://www.cnrm.meteo.fr/en/homepage/"
      },
      {
        "short": "IMT Nord Europe",
        "en": "IMT Nord Europe",
        "zh": "法国北方矿业电信学院",
        "url": "https://imt-nord-europe.fr/en/"
      }
    ]
  },
  {
    "id": "morocco",
    "en": "Morocco",
    "zh": "摩洛哥",
    "code": "MA",
    "institutions": [
      {
        "short": "UM6P",
        "en": "Mohammed VI Polytechnic University",
        "zh": "穆罕默德六世理工大学",
        "url": "https://www.um6p.ma/en"
      }
    ]
  },
  {
    "id": "united-kingdom",
    "en": "United Kingdom",
    "zh": "英国",
    "code": "UK",
    "institutions": [
      {
        "short": "York",
        "en": "University of York",
        "zh": "约克大学",
        "url": "https://www.york.ac.uk/chemistry/research/wacl/"
      },
      {
        "short": "Lancaster",
        "en": "Lancaster University",
        "zh": "兰卡斯特大学",
        "url": "https://www.lancaster.ac.uk/lec/"
      }
    ]
  },
  {
    "id": "switzerland",
    "en": "Switzerland",
    "zh": "瑞士",
    "code": "CH",
    "institutions": [
      {
        "short": "PSI",
        "en": "Paul Scherrer Institute",
        "zh": "保罗谢尔研究所",
        "url": "https://www.psi.ch/en"
      }
    ]
  },
  {
    "id": "canada",
    "en": "Canada",
    "zh": "加拿大",
    "code": "CA",
    "institutions": [
      {
        "short": "Toronto",
        "en": "University of Toronto",
        "zh": "多伦多大学",
        "url": "https://www.utoronto.ca/"
      }
    ]
  },
  {
    "id": "austria",
    "en": "Austria",
    "zh": "奥地利",
    "code": "AT",
    "institutions": [
      {
        "short": "Graz",
        "en": "University of Graz",
        "zh": "格拉茨大学",
        "url": "https://www.uni-graz.at/en/"
      }
    ]
  },
  {
    "id": "brazil",
    "en": "Brazil",
    "zh": "巴西",
    "code": "BR",
    "institutions": [
      {
        "short": "USP",
        "en": "University of São Paulo",
        "zh": "圣保罗大学",
        "url": "https://www5.usp.br/english/institutional/"
      }
    ]
  }
];
    function collaborations() {
      const partner = item => `<article class="partner"><p class="partner-code">${escape(item.short)}</p><h3>${escape(t(item.en,item.zh))}</h3>${lang==='zh'?`<p class="partner-original">${escape(item.en)}</p>`:''}<div class="partner-links"><a href="${escape(item.url)}" ${external}>${t('Institution website','机构网站')} ↗</a></div></article>`;
      return `<div class="page-heading"><p class="eyebrow">${t('RESEARCH ACROSS BORDERS','跨越国界的科研交流')}</p><h1>${t('International collaborations','国际合作')}</h1><p>${t('Connecting people, observations, and ideas.','连接学者、观测与科学思想。')}</p></div><div class="network-intro"><p>${t('Our international research network connects universities and institutes around the world. Research collaborations and joint publications bring together field observations, laboratory experiments, instrument development, and atmospheric modeling.','我们的国际科研网络连接世界各地的高校和研究机构，通过科研合作与共同发表论文，汇集外场观测、实验室实验、仪器研发和大气模型模拟等研究方法。')}</p><nav class="country-index" aria-label="${t('Browse by country','按国家浏览')}">${collaborationCountries.map(country=>`<a href="/collaborations/#country-${country.id}"><span>${escape(t(country.en,country.zh))}</span><span class="country-count">${country.institutions.length}</span></a>`).join('')}</nav></div>${collaborationCountries.map(country=>`<section class="collaboration-country" id="country-${country.id}" aria-labelledby="country-title-${country.id}"><div class="country-heading"><span class="country-code" aria-hidden="true">${country.code}</span><h2 id="country-title-${country.id}">${escape(t(country.en,country.zh))}</h2></div><div class="partner-grid">${country.institutions.map(partner).join('')}</div></section>`).join('')}<section class="join-contact"><h2>${t('Connect with us','欢迎开展合作')}</h2><p>${t('We welcome opportunities for scientific exchange, joint research, and academic visits in atmospheric chemistry and surface–atmosphere exchange.','欢迎围绕大气化学与地表—大气交换开展学术交流、联合研究和学术访问。')}</p><a href="mailto:xuechaoyang@mail.iap.ac.cn">xuechaoyang@mail.iap.ac.cn ↗</a></section>`;
    }
    function cvRow(date,title,description,note=''){return `<div class="cv-row"><div class="date">${date}</div><div><h3>${title}</h3><p>${description}</p>${note?`<p class="cv-note">${note}</p>`:''}</div></div>`;}
    function cv() {
      return `<div class="page-heading"><p class="eyebrow">${t('CURRICULUM VITAE','个人简历')}</p><h1>${t('Experience & education','工作与教育经历')}</h1><p>${t('Prof. Dr. Chaoyang Xue · Atmospheric chemistry','薛朝阳 · 大气化学')}</p></div><section class="cv-section"><h2>${t('Appointments','工作经历')}</h2>${cvRow(t('2026–present','2026–至今'),t('Institute of Atmospheric Physics, Chinese Academy of Sciences (IAP-CAS)','中国科学院大气物理研究所（IAP-CAS）'),t('State Key Laboratory of Atmospheric Environment and Extreme Meteorology (AEEM)<br>Professor · Beijing, China','大气环境与极端气象全国重点实验室（AEEM）<br>研究员 · 中国北京'))}${cvRow('2023–2026',t('Max Planck Institute for Chemistry (MPIC)','马克斯·普朗克化学研究所（MPIC）'),t('Humboldt Fellow / Marie Skłodowska-Curie Fellow · Mainz, Germany','洪堡／玛丽居里学者 · 德国美因茨'),t('Research collaboration with Prof. Hang Su and Prof. Yafang Cheng.','科研合作：苏杭教授、程雅芳教授。'))}${cvRow('2020–2022',t('Laboratory of Physics and Chemistry of the Environment and Space, French National Centre for Scientific Research (LPC2E-CNRS)','法国国家科学研究中心环境与空间物理化学实验室（LPC2E-CNRS）'),t('Labex-Voltaire Fellow · Orléans, France','Labex-Voltaire 学者 · 法国奥尔良'),t('Research collaboration with Prof. Valery Catoire.','科研合作：Valery Catoire 教授。'))}</section><section class="cv-section"><h2>${t('Education','教育经历')}</h2>${cvRow('2014–2020',t('International Dual Ph.D. in Atmospheric Chemistry','大气化学联合博士'),t('Laboratory of Physics and Chemistry of the Environment and Space, French National Centre for Scientific Research (LPC2E-CNRS), France; Research Center for Eco-Environmental Sciences, Chinese Academy of Sciences (RCEES-CAS), China','法国国家科学研究中心环境与空间物理化学实验室（LPC2E-CNRS）；中国科学院生态环境研究中心（RCEES-CAS）'),t('Ph.D. supervisors: Prof. Yujing Mu, Prof. Wahid Mellouki, and Prof. Valery Catoire.','博士导师：牟玉静教授、Wahid Mellouki 教授、Valery Catoire 教授。'))}${cvRow('2010–2014',t('B.Sc. in Environmental Science','环境科学学士'),t('China University of Petroleum, Beijing','中国石油大学（北京）'))}</section><section class="cv-section" id="academic-service"><h2>${t('Academic service','学术服务')}</h2><div class="service-group"><h3>${t('Editorial appointments','期刊任职')}</h3><ul class="service-list"><li><strong>Air Quality, Atmosphere &amp; Health</strong><span>${t('Associate Editor','副主编')}</span></li><li><strong>Environmental Science &amp; Technology (ES&amp;T)</strong><span>${t('Early Career Editorial Board Member','青年编委')}</span></li><li><strong>Eco-Environment &amp; Health</strong><span>${t('Young Editorial Board Member','青年编委')}</span></li><li><strong>Science Bulletin</strong><span>${t('Young Editorial Board Member','青年编委')}</span></li></ul></div><div class="service-group"><h3>${t('Peer review','同行评审')}</h3><p class="service-summary">${t('Peer reviewer for international journals, including Nature Sustainability, Science Advances (SA), Atmospheric Chemistry and Physics (ACP), Environmental Science &amp; Technology (ES&amp;T), Journal of Geophysical Research: Atmospheres (JGR), npj Climate and Atmospheric Science (npj-CAS), and Environmental Science &amp; Technology Letters (ES&amp;T Letters).','为 Nature Sustainability、Science Advances（SA）、Atmospheric Chemistry and Physics（ACP）、Environmental Science &amp; Technology（ES&amp;T）、Journal of Geophysical Research: Atmospheres（JGR）、npj Climate and Atmospheric Science（npj-CAS）、Environmental Science &amp; Technology Letters（ES&amp;T Letters）等国际期刊担任审稿人。')}</p><a class="text-link" href="https://orcid.org/0000-0001-6673-7716" ${external}>${t('Peer-review activity on ORCID','ORCID 公开审稿记录')} ↗</a></div></section><section class="cv-section" id="fellowships-honors"><h2>${t('Fellowships &amp; Honors','学术资助与荣誉')}</h2><ul class="funding"><li>${t('NSFC Excellent Young Scientists Fund (Overseas) Recipient','国家自然科学基金优秀青年科学基金项目（海外）入选者（海外优青）')}</li><li>${t('Marie Skłodowska-Curie Fellow','玛丽居里学者')}</li><li>${t('Alexander von Humboldt Fellow','洪堡学者')}</li><li>${t('Labex-Voltaire Fellow','Labex-Voltaire 学者')}</li></ul></section>`;
    }
    function join() {
      const opportunities = [
        ['Master’s, PhD & postdoctoral opportunities','硕士、博士与博士后','We recruit master’s students, PhD students, and postdoctoral researchers every year. Applicants from China and around the world are welcome.','课题组每年招收硕士研究生、博士研究生和博士后，欢迎国内外申请者加入。'],
        ['Undergraduate internships','本科生实习','Outstanding undergraduate students are welcome to join us for research internships in atmospheric chemistry.','欢迎优秀本科生来课题组实习，参与大气化学相关科研工作。'],
        ['Academic visits','学术访问','We welcome scholars from around the world for academic visits and research exchanges.','欢迎世界各地学者来访，开展学术交流与科研合作。']
      ];
      return `<div class="page-heading"><p class="eyebrow">${t('OPPORTUNITIES & EXCHANGE','招生招聘与学术交流')}</p><h1>${t('Join us','加入我们')}</h1><p>${t('Atmospheric chemistry · Institute of Atmospheric Physics, Chinese Academy of Sciences','大气化学 · 中国科学院大气物理研究所')}</p></div>${opportunities.map((item,i)=>`<section class="research-item"><span class="num">0${i+1}</span><div><h2>${t(item[0],item[1])}</h2><p>${t(item[2],item[3])}</p></div></section>`).join('')}<section class="join-contact"><h2>${t('Get in touch','欢迎联系')}</h2><p>${t('For enquiries about joining us or arranging a visit, please email Prof. Dr. Chaoyang Xue.','如有意申请或来访，欢迎通过邮件联系薛朝阳研究员。')}</p><a href="mailto:xuechaoyang@mail.iap.ac.cn">xuechaoyang@mail.iap.ac.cn ↗</a></section>`;
    }
    function render(scroll=true) {
      const hash=location.hash.slice(1);
      const initialRoute=document.body.dataset.route || 'home';
      const route=hash.startsWith('publications')?'publications':hash.startsWith('collaborations')?'collaborations':(['home','research','cv','join'].includes(hash)?hash:initialRoute);
      document.documentElement.lang=lang==='en'?'en':'zh-CN';
      const labels=lang==='en'?['About','Research','Publications','Collaborations','CV','Join us']:['关于','研究方向','论文','国际合作','简历','加入我们'];
      document.querySelectorAll('nav [data-route]').forEach((a,i)=>{a.textContent=labels[i];a.classList.toggle('active',a.dataset.route===route);if(a.dataset.route===route)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
      document.getElementById('language').textContent=t('中文','EN');
      document.getElementById('language').setAttribute('aria-label',t('Switch to Chinese','切换为英文'));
      document.getElementById('position').textContent=t('Professor','研究员');
      document.getElementById('affiliation').innerHTML=t('Institute of Atmospheric Physics<br>Chinese Academy of Sciences','中国科学院<br>大气物理研究所');
      document.getElementById('location').textContent=t('Beijing, China','中国 · 北京');
      document.getElementById('footer-affiliation').textContent=t('Institute of Atmospheric Physics, Chinese Academy of Sciences','中国科学院大气物理研究所');
      document.getElementById('profile-note').innerHTML=t('ATMOSPHERIC CHEMISTRY<br>FIELD OBSERVATIONS<br>LABORATORY EXPERIMENTS<br>ATMOSPHERIC MODELING<br>INSTRUMENT DEVELOPMENT','大气化学<br>外场观测<br>实验室实验<br>模型模拟<br>仪器研发');
      main.innerHTML=({home,publications,research,collaborations,cv,join})[route]();
      document.querySelectorAll('a[href^="/"]').forEach(a=>{
        const url=new URL(a.getAttribute('href'),location.origin);
        if(lang==='zh')url.searchParams.set('lang','zh');else url.searchParams.delete('lang');
        a.setAttribute('href',url.pathname+url.search+url.hash);
      });
      document.title=t('Prof. Dr. Chaoyang Xue','薛朝阳')+' | '+labels[['home','research','publications','collaborations','cv','join'].indexOf(route)];
      const yearMatch=hash.match(/^(?:publications-|year-)(\d{4})$/);
      if(yearMatch){requestAnimationFrame(()=>document.getElementById('year-'+yearMatch[1])?.scrollIntoView());}
      else if(/^(?:collaborations-|country-)/.test(hash)){requestAnimationFrame(()=>document.getElementById('country-'+hash.replace(/^(?:collaborations-|country-)/,''))?.scrollIntoView());}
      else if(scroll)window.scrollTo(0,0);
    }
    document.getElementById('language').addEventListener('click',()=>{lang=lang==='en'?'zh':'en';const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(null,'',url);render(false);});
    window.addEventListener('hashchange',()=>render());
    render(false);
  })();
