import './style.css';

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const priorities = [
  { id:'insurance', level: 'critical', title: 'Review commercial insurance', detail: 'Premiums are 18% above the peer benchmark.', savings: 18300 },
  { id:'processing', level: 'high', title: 'Renegotiate merchant processing', detail: 'Effective fees increased 11% this quarter.', savings: 14800 },
  { id:'software', level: 'medium', title: 'Consolidate overlapping software', detail: '27 paid seats show no activity in 90 days.', savings: 7900 },
  { id:'cashflow', level: 'positive', title: 'Cash flow improved', detail: '90-day liquidity risk moved from moderate to low.', savings: 0 },
  { id:'freight', level: 'positive', title: 'New freight savings opportunity', detail: 'West-location freight cost is 12% above average.', savings: 5100 }
];

const ACTIONS_KEY='atlasExecutiveActions23';
const defaultActions=priorities.filter(p=>p.savings>0).map((p,index)=>({id:p.id,title:p.title,impact:p.savings,status:index===0?'in-progress':'identified',owner:index===0?'Brian Hess':'Unassigned',due:index===0?'Aug 14, 2026':'Not scheduled',realized:0}));
function loadActions(){try{const saved=JSON.parse(localStorage.getItem(ACTIONS_KEY)||'null');return Array.isArray(saved)&&saved.length?saved:structuredClone(defaultActions)}catch{return structuredClone(defaultActions)}}
function saveActions(actions){localStorage.setItem(ACTIONS_KEY,JSON.stringify(actions))}
function actionSummary(){const actions=loadActions();return {actions,identified:actions.reduce((n,a)=>n+a.impact,0),realized:actions.reduce((n,a)=>n+(Number(a.realized)||0),0),completed:actions.filter(a=>a.status==='completed').length,inProgress:actions.filter(a=>a.status==='in-progress').length}}

const executiveTimeline = [
  ['8:42 AM','Atlas analyzed 9,842 transactions','complete'],
  ['8:44 AM','Duplicate subscription pattern reviewed','complete'],
  ['8:47 AM','New freight savings opportunity identified','complete'],
  ['9:03 AM','Daily CEO brief prepared','complete'],
  ['9:18 AM','Insurance renewal placed at highest priority','active']
];

const companyHealth = [
  ['Cash Flow',84,'Healthy and improving'],
  ['Growth',72,'Revenue trend remains positive'],
  ['Efficiency',93,'Strong operating discipline'],
  ['Risk',31,'Low overall exposure']
];

const priorityGroups = [
  ['Immediate attention','critical',[['Commercial insurance renewal','18% above peer benchmark · renewal window approaching','$18,300'],['Vendor invoice review','22% above six-month average · verify surcharge','Review']]],
  ['This week','warning',[['Merchant processing repricing','Effective rate increased this quarter','$14,800'],['West-location freight review','Cost per shipment is 12% above average','$5,100']]],
  ['Opportunities','positive',[['Software seat consolidation','27 inactive seats detected','$7,900'],['Collections acceleration','Three accounts drive most overdue receivables','Cash impact']]]
];

const intelligence = [
  ['Insurance market', 'Commercial premiums are softening for low-claim manufacturers.', '6 min ago'],
  ['Fuel costs', 'Regional diesel prices are trending 2.1% lower this month.', '18 min ago'],
  ['Steel watch', 'Input prices rose 3.0%; review open purchase orders.', '36 min ago'],
  ['Compliance', 'A new OSHA recordkeeping reminder is approaching.', '1 hr ago'],
  ['Rates', 'Borrowing-cost outlook is stable for the next planning cycle.', '2 hr ago']
];

const app = document.querySelector('#app');
app.innerHTML = `
<div class="app-shell">
  <aside class="sidebar">
    <div class="brand"><span class="brand-mark">A</span><div><strong>ATLAS AI</strong><small>SMARTLEDGER</small></div></div>
    <nav class="sidebar-nav">
      ${['Dashboard','Financial Imports','Transactions','Import History','Payments & Billing','Settings'].map((x,i)=>`<button class="nav-item ${i===0?'active':''}" data-nav="${x}"><span>${['⌂','⇧','≡','◷','$','⚙'][i]}</span>${x}</button>`).join('')}
    </nav>
    <div class="sidebar-bottom">
      <div class="privacy-card"><span>◇</span><div><strong>Private processing</strong><small>Files remain in your browser</small></div></div>
      <button class="signout">↪ Sign out</button>
    </div>
  </aside>

  <div class="workspace">
    <header class="topbar">
      <div><span class="micro">CURRENT WORKSPACE</span><button class="workspace-name">Atlas AI Demo Company⌄</button></div>
      <div class="top-actions">
        <button class="outline" id="presentationBtn">Presentation mode</button>
        <span class="release">ATLAS 32 · OPPORTUNITY-TO-SAVINGS</span>
        <div class="profile"><span>BH</span><div><strong>Brian Hess</strong><small>Owner</small></div></div>
      </div>
    </header>

    <section class="demo-strip"><div><span class="live">LIVE DEMO WORKSPACE</span><strong>Atlas Manufacturing Group</strong><span>Fictional but internally consistent data · 9,842 transactions</span></div><button class="outline" id="reloadBtn">Reload demo data</button></section>

    <main class="page" id="mainPage">
      <section class="welcome-card">
        <div>
          <span class="micro">ATLAS OPPORTUNITY-TO-SAVINGS · SPRINT 32</span>
          <h1 id="dynamicGreeting">Good afternoon, Brian.</h1>
          <p>Atlas reviewed your business overnight and ranked the three items that matter most today.</p>
          <div class="welcome-actions"><button class="gold" id="briefBtn">View executive brief</button><button class="ghost" id="actionTrackerBtn">Open action tracker</button><button class="ghost" id="askBtn">Ask Atlas</button></div>
        </div>
        <div class="welcome-stats">
          <article><span>OPPORTUNITIES</span><strong class="count" data-value="4">0</strong><small>Ready for review</small></article>
          <article><span>ANNUAL SAVINGS</span><strong class="count money" data-value="46100">$0</strong><small>Identified by Atlas</small></article>
          <article><span>FINANCIAL HEALTH</span><strong class="count" data-value="92">0</strong><small>Healthy</small></article>
          <article><span>ATLAS CONFIDENCE</span><strong class="count percent" data-value="98">0%</strong><small>High confidence</small></article>
        </div>
      </section>

      <section class="panel morning-briefing" id="morningBriefing">
        <div class="morning-brief-head">
          <div><span class="micro">YOUR 90-SECOND EXECUTIVE BRIEFING</span><h2>Atlas has already done the overnight review</h2><p>9,842 transactions, 231 invoices, and 48 vendor payments analyzed.</p></div>
          <div class="briefing-confidence"><span>CONFIDENCE</span><strong>94%</strong><small>High-confidence recommendation</small></div>
        </div>
        <div class="morning-priorities">
          <button class="morning-priority critical" data-morning-action="insurance"><span>01</span><div><small>IMMEDIATE ATTENTION</small><strong>Commercial insurance renewal</strong><p>Premiums are 18% above peer benchmarks and the renewal window is approaching.</p></div><b>$18,300</b></button>
          <button class="morning-priority warning" data-morning-action="processing"><span>02</span><div><small>THIS WEEK</small><strong>Merchant processing repricing</strong><p>The blended fee rate increased 11% this quarter.</p></div><b>$14,800</b></button>
          <button class="morning-priority positive" data-morning-action="cash"><span>03</span><div><small>POSITIVE MOMENTUM</small><strong>Cash position improved</strong><p>Cash increased $38,200 and 90-day liquidity risk remains low.</p></div><b>Healthy</b></button>
        </div>
        <div class="biggest-opportunity">
          <div><span class="micro">TODAY'S BIGGEST OPPORTUNITY</span><h3>Begin the commercial insurance review</h3><p>Highest modeled impact, approaching deadline, and low implementation risk.</p></div>
          <div class="opportunity-facts"><div><span>ANNUAL IMPACT</span><strong>$18,300</strong></div><div><span>DIFFICULTY</span><strong>Low</strong></div><div><span>TIME TO ACT</span><strong>14 days</strong></div></div>
          <div class="briefing-actions"><button class="gold" id="startMorningInitiative">Start initiative</button><button class="outline" id="showMorningEvidence">Show evidence</button><button class="ghost" id="remindMorning">Remind me tomorrow</button></div>
        </div>
        <div class="momentum-summary"><span class="momentum-arrow">↗</span><div><strong>Business momentum is improving.</strong><p>Revenue and cash remain healthy. Negotiable operating costs are the clearest near-term opportunity.</p></div></div>
      </section>

      <section class="panel opportunity-center" id="opportunityCenter">
        <div class="section-head">
          <div><span class="micro">SPRINT 32 · OPPORTUNITY-TO-SAVINGS WORKFLOW</span><h2>Turn Atlas recommendations into verified results</h2><p>Approve opportunities, assign ownership, track progress, and record the savings your team actually captures.</p></div>
          <button class="outline" id="manageAllOpportunities">Manage all</button>
        </div>
        <div id="opportunityCenterBody"></div>
      </section>

      <section class="dashboard-grid">
        <div class="main-column">
          <section class="kpi-grid">
            <article class="panel kpi"><span>ANNUAL REVENUE</span><strong class="count money" data-value="28400000">$0</strong><small>Healthy operating trend</small></article>
            <article class="panel kpi"><span>CASH ON HAND</span><strong class="count money" data-value="2840000">$0</strong><small>Low 90-day risk</small></article>
            <article class="panel kpi"><span>ACTIVE VENDORS</span><strong class="count" data-value="412">0</strong><small>Across 3 locations</small></article>
            <article class="panel kpi"><span>SAVINGS IDENTIFIED</span><strong class="count money" data-value="46100">$0</strong><small>4 ranked opportunities</small></article>
          </section>

          <section class="sprint25-value-grid">
            <article class="panel saved-today-card">
              <div class="section-head"><div><span class="micro">ATLAS SAVED YOU TODAY</span><h2>Value created before lunch</h2></div><span class="ready-pill green">● LIVE VALUE</span></div>
              <div class="saved-metrics">
                <div><strong>$1,842</strong><span>annual savings surfaced today</span></div>
                <div><strong>4.3 hrs</strong><span>manual review time avoided</span></div>
                <div><strong>7</strong><span>duplicate charges screened</span></div>
                <div><strong>2</strong><span>tax opportunities detected</span></div>
              </div>
            </article>
            <article class="panel health-card">
              <div class="section-head"><div><span class="micro">LIVE COMPANY HEALTH</span><h2>Five-second business view</h2></div><strong class="health-score">92</strong></div>
              <div class="health-list">${companyHealth.map(([label,value,note])=>`<div class="health-row"><div><strong>${label}</strong><small>${note}</small></div><div class="health-meter"><span style="--value:${value}%"></span></div><b>${value}%</b></div>`).join('')}</div>
            </article>
          </section>

          <section class="panel priority-center-v25">
            <div class="section-head"><div><span class="micro">ATLAS PRIORITY CENTER</span><h2>What deserves the CEO's attention</h2></div><span class="ready-pill">RANKED BY IMPACT + URGENCY</span></div>
            <div class="priority-groups">${priorityGroups.map(([title,level,items])=>`<section class="priority-group ${level}"><header><span></span><strong>${title}</strong><small>${items.length} items</small></header>${items.map(([name,detail,value])=>`<button class="priority-card-v25" data-v25-priority="${name}"><div><strong>${name}</strong><small>${detail}</small></div><b>${value}</b><span>›</span></button>`).join('')}</section>`).join('')}</div>
          </section>

          <section class="panel action-tracker-summary" id="actionTrackerSummary"></section>

          <section class="panel action-center">
            <div class="section-head"><div><span class="micro">CEO ACTION CENTER</span><h2>Today's executive priorities</h2></div><span class="ready-pill">RANKED BY ATLAS</span></div>
            <div class="priority-list">
              ${priorities.map((p,i)=>`<button class="priority-row" data-priority="${i}"><span class="priority-dot ${p.level}"></span><span class="priority-rank">${String(i+1).padStart(2,'0')}</span><span class="priority-copy"><strong>${p.title}</strong><small>${p.detail}</small></span><span class="impact">${p.savings?money.format(p.savings):'Positive trend'}</span><span class="arrow">›</span></button>`).join('')}
            </div>
          </section>

          <section class="panel executive-timeline-panel">
            <div class="section-head"><div><span class="micro">EXECUTIVE ACTIVITY TIMELINE</span><h2>Atlas working in the background</h2></div><span class="pulse">● ACTIVE</span></div>
            <div class="executive-timeline">${executiveTimeline.map(([time,text,status])=>`<div class="timeline-event ${status}"><time>${time}</time><span></span><div><strong>${text}</strong><small>${status==='active'?'Monitoring and preparing next action':'Completed automatically'}</small></div><b>${status==='active'?'NOW':'✓'}</b></div>`).join('')}</div>
          </section>

          <section class="two-col">
            <article class="panel savings-panel">
              <div class="section-head"><div><span class="micro">SAVINGS TIMELINE</span><h2>Value identified this year</h2></div><strong>$46,100</strong></div>
              <div class="timeline-bars">
                ${[['Jan',4200],['Feb',6300],['Mar',8900],['Apr',11700],['May',6800],['Jun',8200]].map(([m,v])=>`<div><span class="bar" style="--h:${Math.round(v/11700*100)}%"></span><small>${m}</small><b>${money.format(v)}</b></div>`).join('')}
              </div>
            </article>
            <article class="panel intelligence-panel">
              <div class="section-head"><div><span class="micro">ATLAS INTELLIGENCE</span><h2>External signals to watch</h2></div><span class="pulse">● LIVE</span></div>
              <div class="feed">${intelligence.map(([t,d,time])=>`<button class="feed-item"><span class="feed-icon">✦</span><span><strong>${t}</strong><small>${d}</small></span><time>${time}</time></button>`).join('')}</div>
            </article>
          </section>
        </div>

        <aside class="atlas-panel" id="atlasPanel">
          <header><div class="atlas-title"><span class="atlas-logo">A</span><div><span>ATLAS · EXECUTIVE COPILOT</span><h2>Ask Atlas</h2><small>Proactive briefings, follow-ups, and remembered context.</small></div></div><div class="copilot-status"><span class="ready-pill green">● READY</span><span class="memory-pill">● MEMORY ON</span></div></header>
          <div class="topic-row"><div><span>CURRENT TOPIC</span><strong id="topic">General business overview</strong><small id="memoryStatus">Conversation context ready</small><div class="context-chips"><span id="contextEntity">Business overview</span><span id="contextGoal">Review priorities</span><span id="contextConfidence">Context ready</span></div></div><div class="topic-actions"><button id="businessMemoryBtn">Business memory</button><button id="historyBtn">History</button><button id="newChat">New chat</button></div></div>
          <div class="copilot-brief" id="copilotBrief"><span class="micro">SINCE YOUR LAST LOGIN</span><strong>4 executive changes detected</strong><small>Insurance renewal risk, new freight savings, stronger cash, and one invoice review.</small><button class="ghost" id="reviewChangesBtn">Review changes</button></div>
          <div class="chat" id="chat"></div>
          <div class="typing" id="typing"><span></span><span></span><span></span><em>Atlas is analyzing…</em></div>
          <div class="quick-prompts">
            <button data-prompt="Explain the top priority">Explain the top priority</button>
            <button data-prompt="Show all savings">Show all savings</button>
            <button data-prompt="What should I do first?">What should I do first?</button>
            <button data-prompt="What changed since yesterday?">What changed since yesterday?</button>
          </div>
          <form id="chatForm"><input id="chatInput" placeholder="Ask Atlas a question…" autocomplete="off"><button class="gold">Send</button></form>
        </aside>
      </section>
    </main>
  </div>
</div>

<div class="modal" id="modal"><div class="modal-card"><button class="modal-close" id="modalClose">×</button><span class="micro" id="modalEyebrow">EXECUTIVE BRIEF</span><h2 id="modalTitle">Atlas Executive Brief</h2><div id="modalBody"></div></div></div>
<div class="toast" id="toast"></div>
`;

// Sprint 23.0.1 navigation recovery
// Preserve the live dashboard before page switching and restore the page templates
// that were omitted from the Sprint 23 package.
const dashboardHTML = document.querySelector('#mainPage').innerHTML;

const pageTemplates = {
  'Financial Imports': `
    <section class="page-heading"><div><span class="micro">FINANCIAL DATA HUB</span><h1>Financial Imports</h1><p>Bring bank, credit-card, and accounting activity into SmartLedger.</p></div><button class="outline ask-page" data-page="Financial Imports">Ask Atlas about imports</button></section>
    <section class="page-grid two-up">
      <article class="panel functional-card"><span class="micro">BANK & CREDIT CARD</span><h2>Import a CSV statement</h2><p>Upload exported transactions from your financial institution. Files remain in your browser during this demonstration.</p><button class="gold" data-import="CSV statement">Choose CSV file</button></article>
      <article class="panel functional-card"><span class="micro">ACCOUNTING PLATFORM</span><h2>Connect accounting data</h2><p>Preview the guided QuickBooks and ledger connection workflow.</p><button class="outline" data-import="accounting data">Start guided connection</button></article>
    </section>
    <section class="panel page-table-panel"><div class="section-head"><div><span class="micro">RECENT ACTIVITY</span><h2>Latest imports</h2></div><span class="ready-pill">ALL SYSTEMS READY</span></div><div class="simple-list"><div><strong>Operating Account</strong><span>4,281 records · July 30, 2026</span><b>Completed</b></div><div><strong>Corporate Visa</strong><span>3,204 records · July 29, 2026</span><b>Completed</b></div><div><strong>Payroll Clearing</strong><span>2,357 records · July 28, 2026</span><b>Completed</b></div></div></section>`,

  'Transactions': `
    <section class="page-heading"><div><span class="micro">FINANCIAL ACTIVITY</span><h1>Transactions</h1><p>Search recent activity and inspect items identified by Atlas.</p></div><button class="outline ask-page" data-page="Transactions">Ask Atlas about transactions</button></section>
    <section class="panel page-table-panel"><div class="table-tools"><input id="transactionSearch" placeholder="Search vendor, date, or amount"><select id="transactionFilter"><option>All categories</option><option>Insurance</option><option>Processing</option><option>Software</option><option>Freight</option></select><button class="outline" id="exportTransactions">Export CSV</button></div><div class="responsive-table"><table id="transactionsTable"><thead><tr><th>Vendor</th><th>Date</th><th>Category</th><th>Amount</th><th>Atlas status</th></tr></thead><tbody>
      <tr class="transaction-row"><td>Harbor Commercial Insurance</td><td>Jul 30, 2026</td><td>Insurance</td><td>$24,880</td><td><span class="table-status opportunity">Opportunity</span></td></tr>
      <tr class="transaction-row"><td>Northstar Merchant Services</td><td>Jul 29, 2026</td><td>Processing</td><td>$18,420</td><td><span class="table-status opportunity">Opportunity</span></td></tr>
      <tr class="transaction-row"><td>CloudStack Software</td><td>Jul 28, 2026</td><td>Software</td><td>$6,980</td><td><span class="table-status review">Review</span></td></tr>
      <tr class="transaction-row"><td>Western Freight Group</td><td>Jul 28, 2026</td><td>Freight</td><td>$12,740</td><td><span class="table-status normal">Normal</span></td></tr>
      <tr class="transaction-row"><td>Midwest Steel Supply</td><td>Jul 27, 2026</td><td>Materials</td><td>$84,260</td><td><span class="table-status review">Review</span></td></tr>
    </tbody></table></div></section>`,

  'Import History': `
    <section class="page-heading"><div><span class="micro">DATA AUDIT TRAIL</span><h1>Import History</h1><p>Review every completed financial-data import.</p></div><button class="outline ask-page" data-page="Import History">Ask Atlas about history</button></section>
    <section class="panel page-table-panel"><div class="section-head"><div><span class="micro">12 SUCCESSFUL IMPORTS</span><h2>Workspace import log</h2></div><span class="ready-pill green">NO ERRORS</span></div><div class="simple-list history-list"><div><strong>Operating Account</strong><span>Jul 30, 2026 · 4,281 records · CSV</span><b>Completed</b></div><div><strong>Corporate Visa</strong><span>Jul 29, 2026 · 3,204 records · CSV</span><b>Completed</b></div><div><strong>Payroll Clearing</strong><span>Jul 28, 2026 · 2,357 records · CSV</span><b>Completed</b></div><div><strong>Operating Account</strong><span>Jun 30, 2026 · 4,112 records · CSV</span><b>Completed</b></div></div></section>`,

  'Payments & Billing': `
    <section class="page-heading"><div><span class="micro">SUBSCRIPTION MANAGEMENT</span><h1>Payments & Billing</h1><p>Manage your SmartLedger plan, payment method, and invoices.</p></div><button class="outline ask-page" data-page="Payments & Billing">Ask Atlas about billing</button></section>
    <section class="page-grid billing-cards"><article class="panel functional-card"><span class="micro">CURRENT PLAN</span><h2>Professional</h2><strong class="billing-price">$299<span>/month</span></strong><p>3 companies · 10 users · Executive AI intelligence</p><button class="gold billing-action" data-billing="Upgrade plan">Manage plan</button></article><article class="panel functional-card"><span class="micro">PAYMENT METHOD</span><h2>Visa ending 4321</h2><p>Expires 04/29 · Next charge August 29, 2026</p><button class="outline billing-action" data-billing="Update payment method">Update payment method</button></article></section>
    <section class="panel page-table-panel"><div class="section-head"><div><span class="micro">INVOICES</span><h2>Billing history</h2></div><button class="outline billing-action" data-billing="Download next invoice">Download next invoice</button></div><div class="simple-list"><div><strong>INV-2026-007</strong><span>July 29, 2026 · $299.00</span><button class="text-link billing-action" data-billing="Download INV-2026-007">Download</button></div><div><strong>INV-2026-006</strong><span>June 29, 2026 · $299.00</span><button class="text-link billing-action" data-billing="Download INV-2026-006">Download</button></div><div><strong>INV-2026-005</strong><span>May 29, 2026 · $299.00</span><button class="text-link billing-action" data-billing="Download INV-2026-005">Download</button></div></div></section>`,

  'Settings': `
    <section class="page-heading"><div><span class="micro">WORKSPACE CONTROLS</span><h1>Settings</h1><p>Configure executive briefings, security, and Atlas memory.</p></div><button class="outline ask-page" data-page="Settings">Ask Atlas about settings</button></section>
    <section class="panel settings-panel"><div class="setting-row"><div><strong>Daily CEO briefing</strong><span>Prepare an executive summary each morning.</span></div><label class="switch"><input type="checkbox" checked><span></span></label></div><div class="setting-row"><div><strong>Atlas conversation memory</strong><span>Keep session context plus company priorities and decisions across visits.</span></div><label class="switch"><input type="checkbox" checked><span></span></label></div><div class="setting-row"><div><strong>Executive notifications</strong><span>Alert the owner when a high-impact item changes.</span></div><label class="switch"><input type="checkbox" checked><span></span></label></div><div class="setting-row"><div><strong>Two-factor authentication</strong><span>Active for the owner account.</span></div><button class="outline settings-action">Manage security</button></div><button class="gold" id="saveSettings">Save settings</button></section>`
};

const replies = {
  'Explain the top priority': 'Commercial insurance is ranked first because premiums are 18% above comparable manufacturers, no competitive rebid has occurred in 31 months, and two policy riders appear to overlap. Estimated annual savings: $18,300.',
  'Show all savings': 'Atlas identified four savings opportunities totaling $46,100 annually: commercial insurance ($18,300), merchant processing ($14,800), software consolidation ($7,900), and freight optimization ($5,100).',
  'What should I do first?': 'Start with commercial insurance. It has the highest estimated impact, the renewal window is approaching, and Atlas confidence is 96%.',
  'What changed since yesterday?': 'Since yesterday, merchant processing fees increased 0.4%, cash on hand improved by $38,200, one new freight savings opportunity was identified, and no new liquidity risk was detected.'
};

const MEMORY_KEY='atlasNaturalConversation30';
const COMPANY_MEMORY_KEY='atlasCompanyMemory28';

const defaultCompanyMemory={
  company:'Atlas Manufacturing Group',
  owner:'Brian Hess',
  priorities:['Reduce recurring operating costs','Protect cash flow','Turn Atlas findings into completed actions'],
  recurringIssues:['Commercial insurance renewal','Merchant-processing fees','Inactive software seats','Freight surcharges'],
  decisions:[{date:'Current demo',text:'Review commercial insurance first because it has the highest modeled impact.'}],
  preferences:['Lead with the key takeaway','Show annual and monthly impact','End with a recommended next action'],
  lastSessionSummary:'The CEO reviewed savings priorities and asked Atlas to maintain conversational context.',
  updatedAt:new Date().toISOString()
};
let companyMemory=loadCompanyMemory();
function loadCompanyMemory(){
  try{const saved=JSON.parse(localStorage.getItem(COMPANY_MEMORY_KEY)||'null');return saved&&typeof saved==='object'?{...structuredClone(defaultCompanyMemory),...saved}:structuredClone(defaultCompanyMemory)}catch{return structuredClone(defaultCompanyMemory)}
}
function saveCompanyMemory(){companyMemory.updatedAt=new Date().toISOString();localStorage.setItem(COMPANY_MEMORY_KEY,JSON.stringify(companyMemory));}
function rememberBusinessItem(type,text){
  const clean=String(text||'').trim(); if(!clean) return;
  const key=type==='decision'?'decisions':type==='priority'?'priorities':type==='issue'?'recurringIssues':'preferences';
  if(key==='decisions') companyMemory.decisions=[{date:new Date().toLocaleDateString(),text:clean},...(companyMemory.decisions||[]).filter(x=>x.text!==clean)].slice(0,12);
  else companyMemory[key]=[clean,...(companyMemory[key]||[]).filter(x=>x!==clean)].slice(0,12);
  saveCompanyMemory();
}
function companyMemorySummary(){
  const priority=(companyMemory.priorities||[])[0]||'Review priorities';
  const issue=(companyMemory.recurringIssues||[])[0]||'No recurring issue saved';
  const decision=(companyMemory.decisions||[])[0]?.text||'No prior decision saved';
  return `I remember ${companyMemory.company}. Current priority: ${priority}. Recurring issue: ${issue}. Most recent decision: ${decision}`;
}
function openBusinessMemory(){
  const list=(title,items,mapper=x=>x)=>`<h3>${title}</h3><ul>${(items||[]).map(x=>`<li>${mapper(x)}</li>`).join('')||'<li>Nothing saved yet.</li>'}</ul>`;
  const body=`<div class="business-memory-modal"><p>${companyMemorySummary()}</p>${list('Executive priorities',companyMemory.priorities)}${list('Recurring issues',companyMemory.recurringIssues)}${list('Prior decisions',companyMemory.decisions,x=>`${x.date}: ${x.text}`)}${list('Response preferences',companyMemory.preferences)}<p class="memory-updated">Updated ${new Date(companyMemory.updatedAt).toLocaleString()}</p></div>`;
  openModal('Atlas Business Memory',body,'SPRINT 32 · OPPORTUNITY-TO-SAVINGS');
}
function parseMemoryCommand(prompt){
  const raw=String(prompt||'').trim();
  let m=raw.match(/^(?:remember|note|save)\s+(?:that\s+)?(.+)/i);
  if(m){rememberBusinessItem(/decision|decided|choose|chose/i.test(m[1])?'decision':/priority|focus|goal/i.test(m[1])?'priority':/issue|problem|risk/i.test(m[1])?'issue':'preference',m[1]);return `Saved to business memory: ${m[1]}`;}
  if(/what do you remember|business memory|remember about (?:the )?company/i.test(raw)) return companyMemorySummary();
  return '';
}

const conversationState={topic:'general',entity:'business overview',lastIntent:'overview',lastQuestion:'',lastAnswer:'',turnCount:0,recommendation:'Review the highest-impact savings opportunity first.',goal:'Review priorities',annualImpact:0,referents:[],confidence:0,summary:'',recentTopics:[],lastQuestions:[],conversationId:'',actionStage:0,lastResponses:[],pendingAction:'',mission:'Review executive priorities',missionStatus:'assessing',decisionOptions:[],nextBestAction:'',planOwner:'Brian Hess',planDue:'This week'};

function loadMemory(){
  try{const saved=localStorage.getItem(MEMORY_KEY)||localStorage.getItem('atlasNaturalConversation27')||localStorage.getItem('atlasNaturalConversation24')||localStorage.getItem('atlasNaturalConversation21_2_1')||'{}';Object.assign(conversationState,JSON.parse(saved));}catch{}
}
function saveMemory(){localStorage.setItem(MEMORY_KEY,JSON.stringify(conversationState));}
function resetMemory(){
  Object.assign(conversationState,{topic:'general',entity:'business overview',lastIntent:'overview',lastQuestion:'',lastAnswer:'',turnCount:0,recommendation:'Review the highest-impact savings opportunity first.',goal:'Review priorities',annualImpact:0,referents:[],confidence:0,summary:'',recentTopics:[],lastQuestions:[],conversationId:crypto.randomUUID?.()||String(Date.now()),actionStage:0,lastResponses:[],pendingAction:'',mission:'Review executive priorities',missionStatus:'assessing',decisionOptions:[],nextBestAction:'',planOwner:'Brian Hess',planDue:'This week'});
  localStorage.removeItem(MEMORY_KEY);
}
function setContext(topic,entity,intent,recommendation='',details={}){
  const topicChanged=conversationState.topic!==topic;
  conversationState.topic=topic;
  conversationState.entity=entity||topic;
  conversationState.lastIntent=intent;
  if(recommendation) conversationState.recommendation=recommendation;
  conversationState.goal=details.goal||conversationState.goal||'Review priorities';
  conversationState.annualImpact=Number(details.annualImpact??conversationState.annualImpact)||0;
  conversationState.referents=Array.isArray(details.referents)?details.referents:conversationState.referents||[];
  conversationState.confidence=Number(details.confidence??conversationState.confidence)||0;
  conversationState.mission=details.mission||executiveMissionForTopic(topic);
  conversationState.missionStatus=details.missionStatus||'active';
  conversationState.nextBestAction=recommendation||conversationState.nextBestAction;
  conversationState.decisionOptions=details.decisionOptions||decisionOptionsForTopic(topic);
  if(topicChanged) conversationState.actionStage=0;
  conversationState.recentTopics=[topic,...(conversationState.recentTopics||[]).filter(x=>x!==topic)].slice(0,6);
  conversationState.summary=`Discussing ${conversationState.entity}; goal: ${conversationState.goal}; next step: ${conversationState.recommendation}`;
  saveMemory();
}
function isFollowUp(q){
  const clean=String(q||'').trim();
  if(!clean) return false;
  return /^(why|how|when|where|who|what about|tell me more|go deeper|keep going|continue|explain|explain (it|that|this)|what next|what should i do next|what do you recommend|compare|compare (it|them|those)|draft (an )?email|do that|which one|is that important|how much|what caused it|and then|what else)[?.!]*$/i.test(clean)
    || /\b(it|this|that|these|those|them|they|one|ones|each|same|previous|above|former|latter)\b/i.test(clean)
    || (clean.split(/\s+/).length<=7 && conversationState.topic!=='general');
}
function monthlyImpact(){return Math.round((Number(conversationState.annualImpact)||0)/12);}
function contextualAmountReply(prompt){
  const q=String(prompt||'').toLowerCase();
  const monthly=/month|monthly|each month/.test(q);
  const annual=Number(conversationState.annualImpact)||0;
  const topic=conversationState.topic;
  if(!annual) return `I’m following the ${conversationState.entity} discussion, but I do not have a modeled dollar amount attached to it yet.`;
  const amount=monthly?money.format(monthlyImpact()):money.format(annual);
  const period=monthly?'per month':'per year';
  const descriptions={software:'the 27 inactive or overlapping software seats',insurance:'the commercial insurance opportunity',processing:'the merchant-processing opportunity',freight:'the freight opportunity'};
  const subject=descriptions[topic]||conversationState.entity;
  return `The modeled impact for ${subject} is approximately ${amount} ${period}${monthly?` (${money.format(annual)} annually ÷ 12)`:''}. For software, that is the potential cost tied to inactive or overlapping licenses—not the company’s entire software bill.`;
}


function rememberQuestion(prompt){
  const q=String(prompt||'').trim();
  conversationState.lastQuestions=[q,...(conversationState.lastQuestions||[]).filter(x=>x!==q)].slice(0,12);
  conversationState.summary=`${conversationState.summary||'Executive discussion'}. Latest question: ${q}`;
}

function normalizeReplyText(text){
  return String(text||'').toLowerCase().replace(/[^a-z0-9$% ]+/g,' ').replace(/\s+/g,' ').trim();
}
function replySimilarity(a,b){
  const A=new Set(normalizeReplyText(a).split(' ').filter(x=>x.length>2));
  const B=new Set(normalizeReplyText(b).split(' ').filter(x=>x.length>2));
  if(!A.size||!B.size) return 0;
  let common=0; A.forEach(x=>{if(B.has(x)) common++});
  return common/Math.max(A.size,B.size);
}
function isConfirmation(prompt){
  return /^(?:ok(?:ay)?|yes|sure|correct|right|exactly|sounds good|let'?s do (?:it|that)|do it|go ahead|proceed|make it happen|that works)(?:[,.! ]+.*)?$/i.test(String(prompt||'').trim());
}
function actionPlanForTopic(topic){
  const plans={
    insurance:['Pull the current policy, coverage schedule, and loss runs.','Ask the broker for three like-for-like quotes.','Compare premium, exclusions, deductibles, and overlapping riders.','Record the selected option in the Action Tracker.'],
    processing:['Download the latest merchant statement.','Calculate the blended rate and isolate processor markup.','Request repricing from the current provider and one competitor.','Record the negotiated rate and verified savings.'],
    software:['Send the inactive-seat list to department owners.','Confirm which seats are still required.','Cancel or consolidate unused licenses before renewal.','Record realized savings after the next billing cycle.'],
    freight:['Review the west location’s five highest-cost lanes.','Combine fragmented shipments where practical.','Request updated quotes from at least two carriers.','Track cost per shipment for 30 days.'],
    invoice:['Place the invoice on temporary review.','Match it to the purchase order and shipment detail.','Ask the vendor to explain the surcharge.','Approve, correct, or dispute it based on the documentation.'],
    savings:['Start the commercial-insurance review.','Then reprice merchant processing.','Assign an owner and due date to each action.','Verify savings before marking either action complete.']
  };
  return plans[topic]||['Verify the supporting data.','Assign an owner and due date.','Complete the recommended action.','Record the result in the Action Tracker.'];
}

function executiveMissionForTopic(topic){
  const missions={
    insurance:'Reduce commercial insurance cost without weakening coverage',
    processing:'Lower merchant-processing fees and protect payment acceptance',
    software:'Remove unused software spend without disrupting teams',
    freight:'Reduce west-location freight cost and shipment fragmentation',
    invoice:'Resolve the flagged invoice before payment approval',
    savings:'Convert identified savings into verified realized savings',
    receivables:'Accelerate collections from the largest overdue accounts',
    payroll:'Control overtime while protecting operating capacity',
    inventory:'Release working capital tied up in slow-moving inventory',
    profitability:'Recover margin through targeted, low-disruption actions',
    risk:'Reduce the most time-sensitive business exposure'
  };
  return missions[topic]||`Resolve the ${conversationState.entity||topic} issue with a clear owner and next action`;
}
function decisionOptionsForTopic(topic){
  const options={
    insurance:['Draft broker request','Build quote-comparison checklist','Open action plan'],
    processing:['Calculate blended rate','Draft repricing request','Compare provider options'],
    software:['Review inactive-seat list','Draft owner confirmation note','Build cancellation plan'],
    freight:['Review top five lanes','Draft carrier quote request','Build 30-day savings test'],
    invoice:['Review supporting documents','Draft vendor question','Place temporary payment hold'],
    savings:['Start insurance plan','Start processing plan','Assign all opportunities'],
    receivables:['Prioritize overdue accounts','Draft collection messages','Build collection schedule']
  };
  return options[topic]||['Review supporting data','Create action plan','Assign owner and due date'];
}
function executivePlanReply(){
  const steps=actionPlanForTopic(conversationState.topic);
  const impact=conversationState.annualImpact?` Expected annual impact: ${money.format(conversationState.annualImpact)}.`:'';
  conversationState.missionStatus='planned';
  conversationState.nextBestAction=steps[0];
  saveMemory();
  return `Executive mission: ${conversationState.mission}.

Plan:
1. ${steps[0]}
2. ${steps[1]}
3. ${steps[2]}
4. ${steps[3]}${impact}

Owner: ${conversationState.planOwner}. Target: ${conversationState.planDue}. I recommend starting with step 1 now.`;
}
function missionStatusReply(){
  const steps=actionPlanForTopic(conversationState.topic);
  const stage=Math.min(Number(conversationState.actionStage)||0,steps.length);
  const complete=stage>=steps.length;
  return `Active mission: ${conversationState.mission}. Status: ${complete?'ready to verify results':conversationState.missionStatus}. Progress: ${stage} of ${steps.length} steps advanced. ${complete?'Next, record the verified outcome in the Action Tracker.':`Next best action: ${steps[stage]}`}`;
}
function chooseDecisionOption(prompt){
  const q=String(prompt||'').toLowerCase();
  const options=conversationState.decisionOptions?.length?conversationState.decisionOptions:decisionOptionsForTopic(conversationState.topic);
  let pick=0;
  if(/second|option 2|number 2|two/.test(q)) pick=1;
  if(/third|option 3|number 3|three/.test(q)) pick=2;
  const selected=options[Math.min(pick,options.length-1)];
  conversationState.pendingAction=selected;
  conversationState.missionStatus='decision made';
  rememberBusinessItem('decision',`${conversationState.mission}: ${selected}`);
  saveMemory();
  return `Decision recorded: ${selected}. This supports the mission to ${conversationState.mission.toLowerCase()}. I’ll move us forward with the first concrete step: ${actionPlanForTopic(conversationState.topic)[conversationState.actionStage||0]}`;
}
function advanceConfirmedAction(){
  const steps=actionPlanForTopic(conversationState.topic);
  const stage=Math.min(Number(conversationState.actionStage)||0,steps.length-1);
  const current=steps[stage];
  const next=steps[stage+1];
  conversationState.actionStage=Math.min(stage+1,steps.length);
  conversationState.pendingAction=current;
  conversationState.lastIntent='confirmation';
  conversationState.missionStatus=stage===0?'in progress':'advancing';
  conversationState.nextBestAction=next||current;
  rememberBusinessItem('decision',`Proceed with ${conversationState.entity}: ${current}`);
  saveMemory();
  if(stage===0) return `Agreed. Mission activated: ${conversationState.mission}. Step 1: ${current}${next?` After that: ${next}`:''} I’ll keep this as the active objective until you change direction.`;
  if(stage<steps.length-1) return `Done—we’re moving to the next step for ${conversationState.entity}: ${current}${next?` Then: ${next}`:''}`;
  return `The planned sequence for ${conversationState.entity} is complete. Final step: ${current} I would now record the outcome and verified savings in the Action Tracker.`;
}
function preventResponseLoop(response,prompt){
  const recent=[conversationState.lastAnswer,...(conversationState.lastResponses||[])].filter(Boolean);
  const duplicate=recent.some(x=>replySimilarity(response,x)>0.82);
  if(!duplicate) return response;
  const steps=actionPlanForTopic(conversationState.topic);
  const stage=Math.min(Number(conversationState.actionStage)||0,steps.length-1);
  conversationState.actionStage=Math.min(stage+1,steps.length);
  return `Let me move this forward instead of repeating myself. For ${conversationState.entity}, the next concrete action is: ${steps[stage]} ${stage+1<steps.length?`After that, ${steps[stage+1].toLowerCase()}`:'Then record the result in the Action Tracker.'}`;
}
function contextualUnknownReply(prompt){
  const q=String(prompt||'').toLowerCase().trim();
  const topic=conversationState.topic;
  const entity=conversationState.entity||'current business issue';
  const amount=Number(conversationState.annualImpact)||0;
  const amountText=amount?` The modeled annual impact is ${money.format(amount)}.`:'';
  const topicDetails={
    insurance:'The evidence points to above-benchmark premiums, stale market testing, and overlapping riders.',
    processing:'The evidence points to a higher blended fee rate and avoidable processor markup.',
    software:'The evidence points to inactive seats and overlapping tools rather than necessary active licenses.',
    freight:'The evidence points to expensive west-location lanes and fragmented shipments.',
    cash:'Collections improved and no unusually large disbursement appeared in the current review.',
    invoice:'The invoice is above the vendor pattern and contains an unusual freight surcharge.',
    payroll:'The increase is concentrated in overtime and staffing changes at the west location.',
    receivables:'Three larger customers account for most of the aging balance.',
    profitability:'Margin pressure is concentrated in a few negotiable operating costs, not weak revenue.',
    inventory:'Slow-moving SKUs are tying up working capital faster than current sales velocity supports.'
  };
  if(isConfirmation(q)) return advanceConfirmedAction();
  if(/no|not that|wrong|different/.test(q)) return `Understood. I will not assume you mean ${entity}. Name the item you want to switch to, or describe the result you want, and I’ll change direction without clearing our history.`;
  if(/how (do|can|would)|what.*step|walk me through/.test(q)) return `${conversationState.recommendation} I would handle it in three steps: verify the supporting data, contact the responsible owner or vendor, and record the result in the Action Tracker.${amountText}`;
  if(/worth|important|priority|urgent/.test(q)) return `${entity.replace(/^./,c=>c.toUpperCase())} is worth attention because it is actionable and financially material.${amountText} It is ${conversationState.confidence>=90?'a high-confidence':'a moderate-confidence'} finding, but it does not require a panic response.`;
  if(/can we|should we|would you/.test(q)) return `Yes—based on the current ${entity} discussion, that is a reasonable next move. ${conversationState.recommendation}${amountText}`;
  if(/what|why|how|when|where|who/.test(q)) return `${topicDetails[topic]||`I’m still following the ${entity} discussion.`}${amountText} ${conversationState.recommendation}`;
  const options=conversationState.decisionOptions?.length?conversationState.decisionOptions:decisionOptionsForTopic(topic);
  return `I’m keeping our mission in view: ${conversationState.mission}. ${topicDetails[topic]||''}${amountText} My recommendation is ${conversationState.recommendation} The best next move is ${conversationState.nextBestAction||actionPlanForTopic(topic)[conversationState.actionStage||0]}. You can also choose: ${options.join(', ')}.`;
}

function detectIntent(prompt){
  const q=String(prompt||'').toLowerCase().trim();
  if(replies[prompt]) return {type:'exact',reply:replies[prompt]};
  if(isConfirmation(q)) return {type:'confirm'};
  if(/what (?:is|are) (?:our|the) goal|what are we trying|active mission|what is the mission/.test(q)) return {type:'mission'};
  if(/show.*plan|build.*plan|action plan|give me.*steps|map.*steps/.test(q)) return {type:'plan'};
  if(/status|where are we|progress/.test(q) && conversationState.topic!=='general') return {type:'missionStatus'};
  if(/(?:first|second|third) (?:one|option)|option [123]|number [123]/.test(q)) return {type:'decisionOption'};
  if(/(?:how much|what.*cost|cost.*how much|pay for).*(?:month|monthly|year|annual)|(?:month|monthly).*(?:cost|pay)/.test(q) && (isFollowUp(q)||conversationState.topic!=='general')) return {type:'contextAmount'};
  if(/draft.*email|write.*email/.test(q)) return {type:'draft'};
  if(/compare carriers|compare them|carrier quotes/.test(q)) return {type:'carriers'};
  if(/why|what caused|reason/.test(q) && isFollowUp(q)) return {type:'why'};
  if(/what next|what should i do next|what do you recommend|do first|where.*start/.test(q)) return {type:'next'};
  if(/tell me more|explain (it|that|this)|more detail/.test(q)) return {type:'more'};
  if(/which one|biggest|largest/.test(q) && isFollowUp(q)) return {type:'which'};
  if(/top priority|highest priority|main priority|first priority/.test(q)) return {type:'priority'};
  if(/all savings|show.*savings|saving opportunities|opportunit/.test(q)) return {type:'savings'};
  if(/yesterday|what changed|since yesterday|daily change/.test(q)) return {type:'changes'};
  if(/18,300|estimate.*insurance|insurance.*estimate/.test(q)) return {type:'insuranceEstimate'};
  if(/invoice.*review|review.*invoice|vendor invoice/.test(q)) return {type:'invoiceReview'};
  if(/insurance|premium|carrier|broker/.test(q)) return {type:'insurance'};
  if(/merchant|processing fee|credit card fee/.test(q)) return {type:'processing'};
  if(/software|subscription|license|seat/.test(q)) return {type:'software'};
  if(/freight|shipping|logistics/.test(q)) return {type:'freight'};
  if(/cash|liquidity|cash flow/.test(q)) return {type:'cash'};
  if(/vendor|supplier/.test(q)) return {type:'vendor'};
  if(/transaction|charge|payment|invoice/.test(q) && /explain|review|why|unusual|flag/.test(q)) return {type:'transaction'};
  if(/import|csv|excel|quickbooks|upload/.test(q)) return {type:'imports'};
  if(/bill|billing|plan|subscription|299|invoice/.test(q)) return {type:'billing'};
  if(/setting|notification|security|two-factor|memory|preference/.test(q)) return {type:'settings'};
  if(/revenue|sales|top line|bookings/.test(q)) return {type:'revenue'};
  if(/profit|margin|ebitda|gross margin|net income|earnings/.test(q)) return {type:'profitability'};
  if(/payroll|labor|wages|overtime|headcount|employee cost/.test(q)) return {type:'payroll'};
  if(/tax|irs|sales tax|estimated tax/.test(q)) return {type:'taxes'};
  if(/compliance|osha|regulation|regulatory|audit/.test(q)) return {type:'compliance'};
  if(/receivable|accounts receivable|ar aging|collections|customer payment|days sales outstanding|dso/.test(q)) return {type:'receivables'};
  if(/payable|accounts payable|ap aging|supplier payment/.test(q)) return {type:'payables'};
  if(/inventory|stock level|slow moving|obsolete/.test(q)) return {type:'inventory'};
  if(/debt|loan|interest|credit line|borrowing/.test(q)) return {type:'debt'};
  if(/runway|how long.*cash|months of cash/.test(q)) return {type:'runway'};
  if(/forecast|projection|outlook|next quarter|year end/.test(q)) return {type:'forecast'};
  if(/budget|variance|over budget|under budget/.test(q)) return {type:'budget'};
  if(/location|branch|site|division/.test(q)) return {type:'locations'};
  if(/customer|client|concentration|churn/.test(q)) return {type:'customers'};
  if(/duplicate|double charge/.test(q)) return {type:'duplicate'};
  if(/anomal|unusual|outlier|suspicious/.test(q)) return {type:'anomalies'};
  if(/largest expense|biggest expense|top cost|where.*spend/.test(q)) return {type:'expenses'};
  if(/risk|warning|concern/.test(q)) return {type:'risk'};
  if(isFollowUp(q)) return {type:'followup'};
  return {type:'unknown'};
}

function contextualFollowUp(type){
  const topic=conversationState.topic;
  if(type==='why'){
    const reasons={
      insurance:'The increase appears tied to renewal pricing, a long gap since the last competitive bid, and two overlapping riders. Claims history does not appear to be the primary driver.',
      processing:'The effective rate rose because transaction mix shifted toward higher-cost card types and the current agreement has not been repriced recently.',
      software:'The opportunity exists because 27 paid seats show no activity in 90 days and several tools have overlapping functions.',
      freight:'The west location is using higher-cost lanes and more fragmented shipments than the other locations.',
      cash:'Cash improved because collections exceeded outgoing payments since yesterday, while no unusually large disbursement posted.',
      invoice:'The invoice was flagged because it is 22% above the vendor’s six-month average and includes an unusual freight surcharge.',
      payroll:'Payroll rose because overtime increased at the west location and two temporary roles converted to full-time positions.',
      profitability:'Margin pressure is coming mainly from insurance, processing fees, and west-location freight rather than a decline in revenue.',
      receivables:'Receivables aged because three larger customers paid later than their normal pattern, increasing DSO.',
      inventory:'Inventory is elevated because several slow-moving SKUs have not matched recent sales velocity.'
    };
    return reasons[topic]||'I can explain the reason, but I need to know which item you mean. Are you referring to insurance, merchant processing, software, freight, cash flow, or the vendor invoice?';
  }
  if(type==='next'){
    const actions={
      insurance:'First, gather the current policy, loss runs, and coverage schedule. Then request three like-for-like quotes before renewal. Compare exclusions and deductibles—not only price.',
      processing:'Calculate the blended processing rate from the latest statement, identify surcharges, and request repricing from the current provider plus one competitor.',
      software:'Send the inactive-seat list to department owners, confirm which licenses are still required, and cancel unused seats before the next renewal.',
      freight:'Compare the west location’s top five lanes, consolidate shipments where possible, and request updated carrier quotes.',
      invoice:'Hold approval temporarily, match the invoice to the purchase order, and ask the vendor to explain the freight surcharge.',
      savings:'Begin with insurance, then merchant processing. Together they represent $33,100 of the $46,100 annual opportunity.',
      payroll:'Review overtime by department and compare staffing schedules before changing headcount.',
      profitability:'Protect margin by acting on the top two savings opportunities before considering broad cost cuts.',
      receivables:'Contact the three largest overdue accounts and tighten follow-up at 15, 30, and 45 days.',
      inventory:'Pause reorders for slow-moving SKUs and validate demand before discounting inventory.'
    };
    return actions[topic]||conversationState.recommendation;
  }
  if(type==='more'){
    const details={
      insurance:'Here’s what stands out: premiums are 18% above the peer benchmark, the account has not been rebid in 31 months, and two riders may overlap. Atlas estimates an achievable 8–12% reduction, equal to about $18,300 annually.',
      processing:'The $14,800 estimate comes from the recent increase in the effective fee rate and the volume processed. A merchant statement would let Atlas separate interchange, assessments, and processor markup.',
      software:'The estimate assumes removal or renegotiation of inactive seats only. Atlas is not recommending removal of software that has active users or a clear operational purpose.',
      freight:'The opportunity is concentrated at the west location, where cost per shipment is 12% above the company average. Lane consolidation is likely the fastest first test.',
      invoice:'The charge has not been labeled fraudulent or duplicate. It is a review item because its amount and surcharge differ from the vendor’s normal pattern.',
      payroll:'Payroll is 4.2% above the prior month, led by overtime at the west location. Base wages remain close to plan.',
      profitability:'Gross margin is 31.6%, down 0.8 percentage points from the prior period. The largest recoverable drivers are insurance and processing fees.',
      receivables:'Accounts receivable totals $1.74 million; $286,000 is over 45 days. Three customers account for most of the aging.',
      inventory:'Inventory totals $3.1 million, with about $214,000 classified as slow-moving in the demo data.'
    };
    return details[topic]||`We are currently discussing ${conversationState.entity}. Ask “why,” “what should I do next,” or name the detail you want me to examine.`;
  }
  if(type==='draft'){
    if(topic==='insurance') return 'Subject: Request for commercial insurance review\n\nHello,\n\nWe are reviewing our upcoming commercial insurance renewal and would like a complete comparison of our current coverage, premiums, deductibles, exclusions, and policy riders. Please provide our current policy schedule and loss runs, then prepare competitive options using equivalent coverage assumptions.\n\nPlease also identify any overlapping riders or coverage that may be consolidated.\n\nThank you,\nBrian K. Hess';
    if(topic==='invoice') return 'Subject: Question regarding recent invoice\n\nHello,\n\nWe are reviewing your recent invoice, which is above our typical six-month average and includes a freight surcharge we would like to verify. Please provide the related purchase order, shipment detail, and an explanation of the surcharge before we approve payment.\n\nThank you,\nBrian K. Hess';
    return 'I can draft that. Should the email address the insurance broker, payment processor, software owner, freight carrier, or invoice vendor?';
  }
  if(type==='carriers') return 'Use the same coverage schedule and loss-run package for all three quotes. Compare total premium, deductibles, exclusions, carrier rating, claims service, and overlapping riders. Atlas would not choose the lowest price if the coverage is materially weaker.';
  return contextualUnknownReply(conversationState.lastQuestion||conversationState.entity);
}

function buildReply(prompt){
  const intent=detectIntent(prompt);
  if(intent.reply){
    if(prompt==='Show all savings') setContext('savings','four savings opportunities','savings','Begin with insurance, then merchant processing.');
    if(prompt==='Explain the top priority') setContext('insurance','commercial insurance opportunity','priority','Request three competitive quotes before renewal.');
    if(prompt==='What should I do first?') setContext('insurance','commercial insurance opportunity','next','Request three competitive quotes before renewal.');
    return intent.reply+'\n\nExecutive recommendation: '+conversationState.recommendation;
  }
  if(intent.type==='mission') return `Our active mission is: ${conversationState.mission}. Success means completing the recommended action and verifying the result in the Action Tracker.`;
  if(intent.type==='plan') return executivePlanReply();
  if(intent.type==='missionStatus') return missionStatusReply();
  if(intent.type==='decisionOption') return chooseDecisionOption(prompt);
  if(intent.type==='confirm') return advanceConfirmedAction();
  if(intent.type==='contextAmount') return contextualAmountReply(prompt);
  if(['why','next','more','draft','carriers','followup','which'].includes(intent.type)){
    if(intent.type==='which') return 'Commercial insurance is the largest opportunity at $18,300 annually, followed by merchant processing at $14,800.';
    return contextualFollowUp(intent.type);
  }
  switch(intent.type){
    case 'priority': setContext('insurance','commercial insurance opportunity','priority','Request three competitive quotes before renewal.'); return replies['Explain the top priority']+'\n\nExecutive recommendation: Request three like-for-like quotes before renewal. Confidence: 96%.';
    case 'savings': setContext('savings','four savings opportunities','savings','Begin with insurance, then merchant processing.'); return replies['Show all savings']+'\n\nThe first two opportunities represent $33,100, or roughly 72% of the total.';
    case 'changes': setContext('changes','changes since yesterday','changes','Review the new freight opportunity and flagged invoice.'); return replies['What changed since yesterday?']+'\n\nNothing requires an emergency response, but the vendor invoice should be reviewed before approval.';
    case 'insuranceEstimate': setContext('insurance','commercial insurance opportunity','insuranceEstimate','Request three competitive quotes before renewal.'); return 'The $18,300 estimate is based on current pricing being 18% above the peer benchmark, a 31-month gap since the last bid, and two potentially overlapping riders. Atlas uses a conservative achievable reduction rather than the full benchmark gap.';
    case 'invoiceReview': setContext('invoice','flagged vendor invoice','invoiceReview','Match it to the purchase order before approving payment.'); return 'One vendor invoice is 22% above that vendor’s six-month average. It also includes an unusual freight surcharge. Atlas recommends verifying the purchase order and requesting supporting detail before payment.';
    case 'insurance': setContext('insurance','commercial insurance opportunity','insurance','Request three competitive quotes before renewal.',{goal:'Lower renewal cost',annualImpact:18300,referents:['commercial insurance','renewal premium','policy riders'],confidence:96}); return 'Commercial insurance is the largest current opportunity. Premiums are 18% above the peer benchmark, no competitive rebid has occurred in 31 months, and Atlas estimates $18,300 in annual savings.\n\nThe first thing I would do is gather the current policy and loss runs.';
    case 'processing': setContext('processing','merchant processing opportunity','processing','Calculate the blended rate and request repricing.',{goal:'Lower processing fees',annualImpact:14800,referents:['merchant processing fees','blended rate','processor markup'],confidence:95}); return 'Merchant processing is the second-largest opportunity. Effective fees increased 11% this quarter, creating an estimated $14,800 annual savings opportunity.\n\nI would calculate the blended rate before negotiating so you know exactly where the markup sits.';
    case 'software': setContext('software','inactive software seats','software','Confirm ownership and cancel inactive seats before renewal.',{goal:'Reduce recurring software spend',annualImpact:7900,referents:['27 paid software seats','inactive licenses','overlapping software'],confidence:97}); return 'Atlas found 27 paid software seats with no activity in the last 90 days. Consolidating inactive or overlapping licenses could save about $7,900 annually, or approximately $658 per month.\n\nI would confirm ownership before removing any license.';
    case 'freight': setContext('freight','freight savings opportunity','freight','Compare the west location’s top five lanes.',{goal:'Reduce west-location freight cost',annualImpact:5100,referents:['west-location freight','shipping lanes','carrier costs'],confidence:91}); return 'Freight costs at the west location are 12% above the company average. Atlas estimates $5,100 in annual savings through carrier comparison, lane consolidation, and contract review.';
    case 'cash': setContext('cash','cash-flow position','cash','Continue monitoring; no intervention is needed today.'); return 'Cash on hand is $2.84 million. Atlas rates 90-day liquidity risk as low, and cash improved by $38,200 since yesterday.\n\nNo immediate cash-flow intervention is recommended.';
    case 'vendor': setContext('vendor','vendor portfolio','vendor','Review the flagged invoice and highest-cost contracts.'); return 'Atlas reviewed 412 active vendors across three locations. The strongest vendor-related opportunities are insurance, merchant processing, software licensing, and freight. No concentration risk currently exceeds the demo alert threshold.';
    case 'transaction': setContext('transaction','selected transaction','transaction','Open the transaction details and verify supporting documentation.'); return `I would evaluate that transaction against the vendor’s history, category pattern, duplicate risk, and benchmark variance. Open the transaction row for the specific evidence behind the flag.`;
    case 'imports': setContext('imports','latest financial import','imports','Review warnings before the next upload.'); return 'The latest imports completed successfully: 9,842 records are available, no import errors require attention, and no duplicate import was detected.';
    case 'billing': setContext('billing','Professional Plan billing','billing','No billing action is required today.'); return 'The Professional Plan is active at $299 per month. Usage is within plan limits, the next scheduled charge is August 29, 2026, and invoices are available on Payments & Billing.';
    case 'settings': setContext('settings','Atlas settings','settings','Keep daily briefings and two-factor authentication enabled.'); return 'Daily CEO briefings, conversation memory, and owner two-factor authentication are enabled. You can change these controls on the Settings page.';
    case 'revenue': setContext('revenue','annual revenue trend','revenue','Continue monitoring; no deterioration signal is present.'); return 'Annual revenue is $28.4 million in the demo workspace, up 6.4% year over year. The strongest contribution comes from the central location, while the west location is growing more slowly. No immediate top-line deterioration signal is present.';
    case 'profitability': setContext('profitability','profitability and margins','profitability','Act on insurance and processing costs before broad cuts.'); return 'Gross margin is 31.6%, down 0.8 percentage points from the prior period. Revenue remains healthy; the pressure is concentrated in insurance, merchant processing, and west-location freight. Addressing the top two savings opportunities could recover a meaningful portion of the decline.';
    case 'payroll': setContext('payroll','payroll and labor costs','payroll','Review overtime by department before changing headcount.'); return 'Payroll is 4.2% above the prior month. Most of the increase comes from overtime at the west location and two temporary roles moving to full-time status. Base wage expense remains close to plan.';
    case 'taxes': setContext('taxes','tax obligations','taxes','Confirm filing dates with your tax professional.'); return 'The demo workspace shows no overdue tax item. Estimated payments and sales-tax obligations appear current, but Atlas should not replace your tax professional. The next step is to confirm filing dates and reconcile taxable sales before submission.';
    case 'compliance': setContext('compliance','compliance status','compliance','Review the OSHA update and document ownership.'); return 'No critical compliance breach is shown in the demo data. One OSHA-related policy update should be reviewed, assigned to an owner, and documented before the next internal audit.';
    case 'receivables': setContext('receivables','accounts receivable','receivables','Contact the three largest overdue accounts.'); return 'Accounts receivable totals $1.74 million, with $286,000 over 45 days. Three customers account for most of the aging. Collections are not yet a liquidity threat, but focused follow-up could improve cash conversion.';
    case 'payables': setContext('payables','accounts payable','payables','Preserve discounts while avoiding early payments without benefit.'); return 'Accounts payable is within the normal range. Atlas found no immediate payment bottleneck. The best opportunity is to capture available early-payment discounts without paying suppliers early when no discount exists.';
    case 'inventory': setContext('inventory','inventory position','inventory','Pause reorders on slow-moving SKUs.'); return 'Inventory totals $3.1 million. About $214,000 is slow-moving based on recent sales velocity. Atlas recommends pausing reorders for those SKUs and validating demand before using discounts.';
    case 'debt': setContext('debt','debt and borrowing costs','debt','Review variable-rate exposure before refinancing.'); return 'Debt service is manageable in the demo workspace. The main watch item is variable-rate exposure on the operating line. A rate comparison may be worthwhile, but there is no current covenant or liquidity warning.';
    case 'runway': setContext('runway','cash runway','runway','Continue monitoring; no immediate capital action is needed.'); return 'Based on current cash and the recent operating pattern, the demo company has more than 12 months of operating coverage. Because the company is cash-flow positive in this scenario, a traditional startup runway calculation is less useful than monitoring liquidity and collections.';
    case 'forecast': setContext('forecast','financial forecast','forecast','Refresh the forecast after insurance quotes and collections updates.'); return 'The current outlook supports continued revenue growth with modest margin pressure. The biggest forecast variables are the insurance renewal, merchant processing costs, and collection timing on three large accounts.';
    case 'budget': setContext('budget','budget performance','budget','Correct concentrated variances instead of broad cuts.'); return 'Overall spending is close to plan, but insurance, processing fees, and west-location freight are above budget. Payroll is modestly elevated due to overtime. Atlas recommends targeted corrections rather than across-the-board reductions.';
    case 'locations': setContext('locations','location performance','locations','Review west-location freight and overtime.'); return 'The central location is the strongest contributor. The west location has two pressure points: freight cost per shipment is 12% above average and overtime is elevated. The east location is performing close to plan.';
    case 'customers': setContext('customers','customer portfolio','customers','Monitor the three largest overdue accounts.'); return 'Customer concentration is within the demo alert threshold, but three larger accounts drive most receivable aging. Atlas sees a collections issue to manage, not a broad churn signal.';
    case 'duplicate': setContext('duplicate','duplicate-payment review','duplicate','Verify invoice number, amount, and date before paying.'); return 'Atlas has not confirmed a duplicate payment in the demo data. One invoice deserves review because the amount and surcharge differ from the vendor’s normal pattern. Match invoice number, amount, purchase order, and payment status before approval.';
    case 'anomalies': setContext('anomalies','financial anomalies','anomalies','Review the flagged invoice and west-location cost variances.'); return 'The most important anomalies are one vendor invoice 22% above its six-month average, west-location freight 12% above the company average, and elevated overtime. None is labeled fraud; each requires supporting-document review.';
    case 'expenses': setContext('expenses','largest business expenses','expenses','Start with costs that are both large and negotiable.'); return 'The largest controllable cost areas in the demo are payroll, insurance, freight, merchant processing, and software. Payroll is largest overall, but insurance and processing offer the fastest near-term savings without reducing staff.';
    case 'risk': setContext('risk','current business risks','risk','Address the insurance renewal before the deadline.'); return 'The highest current risk is the approaching insurance renewal at above-benchmark pricing. Secondary risks are receivable aging, west-location freight and overtime, and the flagged vendor invoice. Liquidity risk remains low.';
    default: return contextualUnknownReply(prompt);
  }
}

function animateCounts(){
  document.querySelectorAll('.count').forEach(el=>{
    const target=Number(el.dataset.value);
    const start=performance.now();
    const duration=900;
    function tick(now){
      const progress=Math.min((now-start)/duration,1);
      const eased=1-Math.pow(1-progress,3);
      const value=Math.round(target*eased);
      if(el.classList.contains('money')) el.textContent=money.format(value);
      else if(el.classList.contains('percent')) el.textContent=`${value}%`;
      else el.textContent=value.toLocaleString('en-US');
      if(progress<1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

function followUpsFor(prompt){
  const type=detectIntent(prompt).type;
  const map={
    insurance:['Show the $18,300 estimate','What should I do first?','Compare carriers'],
    carriers:['Show the $18,300 estimate','Draft broker questions','What should I do first?'],
    insuranceEstimate:['Compare carriers','Explain the top priority','Show all savings'],
    invoiceReview:['Why was it flagged?','Is it a duplicate?','What should I do first?'],
    savings:['Explain the top priority','Rank by fastest payoff','What changed since yesterday?'],
    processing:['How was $14,800 calculated?','Show all savings','What should I do first?'],
    cash:['What changed since yesterday?','Show financial risks','Explain cash flow'],
    imports:['Did any imports fail?','How many records were added?','Review transactions'],
    billing:['When is the next charge?','What does the plan include?','Show billing history'],
    settings:['Which alerts are enabled?','Is two-factor active?','How does memory work?'],
    transaction:['Why was it flagged?','Is it a duplicate?','Show related savings'],
    profitability:['Why did margin decline?','What should I do next?','Show all savings'],
    payroll:['Why did payroll rise?','What should I do next?','Compare locations'],
    receivables:['Which customers are overdue?','What should I do next?','Explain cash flow'],
    inventory:['What is slow-moving?','What should I do next?','Show business risks'],
    forecast:['What could change the forecast?','What should I do next?','Show business risks'],
    anomalies:['Why was it flagged?','What should I do next?','Is it a duplicate?'],
    expenses:['Which cost can I reduce first?','Show all savings','Explain profitability']
  };
  return map[type]||['Show all savings','Explain the top priority','What changed since yesterday?'];
}

function renderFollowUps(prompt){
  const row=document.querySelector('.quick-prompts');
  if(!row) return;
  row.innerHTML=followUpsFor(prompt).map(x=>`<button data-prompt="${x.replace(/"/g,'&quot;')}">${x}</button>`).join('');
  row.querySelectorAll('[data-prompt]').forEach(b=>b.addEventListener('click',()=>answer(b.dataset.prompt)));
}

const COPILOT_STORAGE_KEY='atlasCopilotConversation28';
const defaultCopilotMessage='I completed your executive review. Since your last login, I found four changes: insurance remains the largest savings opportunity, a new $5,100 freight opportunity appeared, cash improved by $38,200, and one vendor invoice needs review. Which should we examine first?';

function escapeMessage(text){return String(text).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function loadConversation(){
  try{const raw=localStorage.getItem(COPILOT_STORAGE_KEY)||localStorage.getItem('atlasCopilotConversation26')||localStorage.getItem('atlasCopilotConversation21_2_1')||'[]';const saved=JSON.parse(raw);return Array.isArray(saved)&&saved.length?saved:[{who:'atlas',text:defaultCopilotMessage}]}catch{return [{who:'atlas',text:defaultCopilotMessage}]}
}
function saveConversation(){
  const items=[...document.querySelectorAll('#chat .message')].map(el=>({who:el.classList.contains('user')?'user':'atlas',text:el.querySelector('p')?.textContent||''}));
  localStorage.setItem(COPILOT_STORAGE_KEY,JSON.stringify(items.slice(-60)));
}
function restoreConversation(){
  const chat=document.querySelector('#chat'); if(!chat) return; chat.innerHTML='';
  loadConversation().forEach(m=>addMessage(m.text,m.who,false));
}
function setGreeting(){
  const h=new Date().getHours(); const part=h<12?'morning':h<17?'afternoon':'evening';
  const el=document.querySelector('#dynamicGreeting'); if(el) el.textContent=`Good ${part}, Brian.`;
}
function addMessage(text, who='atlas', persist=true){
  const chat=document.querySelector('#chat'); if(!chat) return;
  const div=document.createElement('div'); div.className=`message ${who}`;
  const safe=escapeMessage(text).replace(/\n/g,'<br>');
  div.innerHTML=who==='atlas'?`<span>A</span><p>${safe}</p>`:`<p>${safe}</p><span>BH</span>`;
  chat.appendChild(div); chat.scrollTop=chat.scrollHeight;
  if(persist) saveConversation();
}
function updateMemoryIndicator(){
  loadMemory();
  const topic=document.querySelector('#topic');
  if(topic) topic.textContent=conversationState.entity==='business overview'?'General business overview':conversationState.entity.replace(/^./,c=>c.toUpperCase());
  const status=document.querySelector('#memoryStatus');
  if(status) status.textContent=conversationState.turnCount?`${conversationState.turnCount} exchanges · mission ${conversationState.missionStatus||'active'}`:'Company memory ready across visits';
  const entity=document.querySelector('#contextEntity'); if(entity) entity.textContent=conversationState.entity==='business overview'?'Business overview':conversationState.entity.replace(/^./,c=>c.toUpperCase());
  const goal=document.querySelector('#contextGoal'); if(goal) goal.textContent=conversationState.mission||conversationState.goal||'Review priorities';
  const confidence=document.querySelector('#contextConfidence'); if(confidence) confidence.textContent=conversationState.confidence?`${conversationState.confidence}% context confidence`:'Context ready';
}
function openConversationHistory(){
  const messages=loadConversation();
  const body=messages.map((m,index)=>`<article class="history-message ${m.who}"><span>${m.who==='atlas'?'ATLAS':'YOU'} · ${String(index+1).padStart(2,'0')}</span><p>${escapeMessage(m.text).replace(/\n/g,'<br>')}</p></article>`).join('');
  openModal('Conversation History',body||'<p>No conversation history yet.</p>','SPRINT 32 · OPPORTUNITY-TO-SAVINGS');
}
function answer(prompt){
  loadMemory();
  companyMemory=loadCompanyMemory();
  addMessage(prompt,'user');
  const typing=document.querySelector('#typing'); typing?.classList.add('show');
  setTimeout(()=>{
    typing?.classList.remove('show');
    const memoryCommand=parseMemoryCommand(prompt);
    let response=memoryCommand||buildReply(prompt);
    response=preventResponseLoop(response,prompt);
    conversationState.lastQuestion=prompt;
    rememberQuestion(prompt);
    conversationState.lastAnswer=response;
    conversationState.lastResponses=[response,...(conversationState.lastResponses||[]).filter(x=>x!==response)].slice(0,8);
    companyMemory.lastSessionSummary=`Discussed ${conversationState.entity}. Latest question: ${prompt}. Latest recommendation: ${conversationState.recommendation}`; saveCompanyMemory();
    conversationState.turnCount=(Number(conversationState.turnCount)||0)+1;
    saveMemory();
    addMessage(response,'atlas');
    updateMemoryIndicator();
    renderFollowUps(prompt);
  },450);
}
function openModal(title, body, eyebrow='EXECUTIVE BRIEF'){document.querySelector('#modalEyebrow').textContent=eyebrow;document.querySelector('#modalTitle').textContent=title;document.querySelector('#modalBody').innerHTML=body;document.querySelector('#modal').classList.add('open')}
function statusLabel(status){return ({identified:'New',reviewing:'Reviewing',approved:'Approved','in-progress':'In progress',completed:'Completed',dismissed:'Dismissed'})[status]||'New'}
function normalizeActions(){
  const actions=loadActions().map((a,index)=>({
    ...a,
    status:a.status||'identified',
    owner:a.owner||'Unassigned',
    due:a.due||'Not scheduled',
    realized:Number(a.realized)||0,
    confidence:a.confidence||[96,92,89,86][index%4],
    evidence:a.evidence||priorities.find(p=>p.id===a.id)?.detail||'Atlas identified this opportunity from the current demo data.'
  }));
  saveActions(actions);
  return actions;
}
function nextOpportunityStatus(status){
  const flow=['identified','reviewing','approved','in-progress','completed'];
  const i=flow.indexOf(status);
  return flow[Math.min(i+1,flow.length-1)]||'reviewing';
}
function renderOpportunityCenter(){
  const body=document.querySelector('#opportunityCenterBody'); if(!body)return;
  const actions=normalizeActions();
  const realized=actions.reduce((n,a)=>n+(Number(a.realized)||0),0);
  const planned=actions.filter(a=>a.status!=='dismissed').reduce((n,a)=>n+(Number(a.impact)||0),0);
  const active=actions.filter(a=>['approved','in-progress'].includes(a.status)).length;
  body.innerHTML=`<div class="opportunity-summary-v32">
    <article><span>SAVINGS YTD</span><strong>${money.format(realized)}</strong><small>Verified results captured</small></article>
    <article><span>PLANNED SAVINGS</span><strong>${money.format(planned)}</strong><small>Open annual opportunity</small></article>
    <article><span>ACTIVE INITIATIVES</span><strong>${active}</strong><small>Approved or in progress</small></article>
    <article><span>COMPLETION RATE</span><strong>${actions.length?Math.round(actions.filter(a=>a.status==='completed').length/actions.length*100):0}%</strong><small>Opportunities completed</small></article>
  </div><div class="opportunity-list-v32">${actions.map(a=>`<article class="opportunity-card-v32" data-opportunity="${a.id}">
    <div class="opportunity-card-head"><span class="tracker-status ${a.status}">${statusLabel(a.status)}</span><b>${a.confidence}% confidence</b></div>
    <h3>${a.title}</h3><p>${a.evidence}</p>
    <div class="opportunity-meta"><span><small>PLANNED</small><strong>${money.format(a.impact)}</strong></span><span><small>REALIZED</small><strong>${money.format(a.realized)}</strong></span><span><small>OWNER</small><strong>${a.owner}</strong></span><span><small>DUE</small><strong>${a.due}</strong></span></div>
    <div class="opportunity-actions"><button class="gold" data-advance-opportunity="${a.id}">${a.status==='completed'?'Completed':`Move to ${statusLabel(nextOpportunityStatus(a.status))}`}</button><button class="outline" data-edit-opportunity="${a.id}">Details</button></div>
  </article>`).join('')}</div>`;
  body.querySelectorAll('[data-advance-opportunity]').forEach(btn=>btn.addEventListener('click',()=>{
    const actions=normalizeActions(); const item=actions.find(a=>a.id===btn.dataset.advanceOpportunity); if(!item||item.status==='completed')return;
    item.status=nextOpportunityStatus(item.status); if(item.status==='completed'&&!item.realized)item.realized=item.impact;
    saveActions(actions); renderOpportunityCenter(); renderActionSummary(); toast(`${item.title}: ${statusLabel(item.status)}`);
  }));
  body.querySelectorAll('[data-edit-opportunity]').forEach(btn=>btn.addEventListener('click',()=>openOpportunityDetail(btn.dataset.editOpportunity)));
}
function openOpportunityDetail(id){
  const item=normalizeActions().find(a=>a.id===id); if(!item)return;
  openModal(item.title,`<div class="opportunity-detail-v32"><p>${item.evidence}</p><div class="brief-grid"><article><span>PLANNED SAVINGS</span><strong>${money.format(item.impact)}</strong><small>Annual estimate</small></article><article><span>REALIZED SAVINGS</span><strong>${money.format(item.realized)}</strong><small>Verified YTD</small></article><article><span>CONFIDENCE</span><strong>${item.confidence}%</strong><small>Atlas confidence</small></article></div><label>Owner<input id="oppOwner" value="${escapeMessage(item.owner)}"></label><label>Target date<input id="oppDue" value="${escapeMessage(item.due)}"></label><label>Status<select id="oppStatus"><option value="identified">New</option><option value="reviewing">Reviewing</option><option value="approved">Approved</option><option value="in-progress">In progress</option><option value="completed">Completed</option><option value="dismissed">Dismissed</option></select></label><label>Realized annual savings<input id="oppRealized" type="number" min="0" step="100" value="${item.realized}"></label><button class="gold modal-action" id="saveOpportunityDetail">Save opportunity</button></div>`,'SPRINT 32 · OPPORTUNITY DETAIL');
  setTimeout(()=>{document.querySelector('#oppStatus').value=item.status;document.querySelector('#saveOpportunityDetail')?.addEventListener('click',()=>{const actions=normalizeActions();const current=actions.find(a=>a.id===id);current.owner=document.querySelector('#oppOwner').value.trim()||'Unassigned';current.due=document.querySelector('#oppDue').value.trim()||'Not scheduled';current.status=document.querySelector('#oppStatus').value;current.realized=Number(document.querySelector('#oppRealized').value)||0;if(current.status==='completed'&&!current.realized)current.realized=current.impact;saveActions(actions);document.querySelector('#modal').classList.remove('open');renderOpportunityCenter();renderActionSummary();toast('Opportunity saved')})},0);
}
function renderActionSummary(){const el=document.querySelector('#actionTrackerSummary');if(!el)return;const s=actionSummary();el.innerHTML=`<div class="section-head"><div><span class="micro">SPRINT 23 · EXECUTIVE ACTION TRACKER</span><h2>Move opportunities into measurable results</h2></div><button class="outline" id="openActionCenter">Manage actions</button></div><div class="action-summary-grid"><article><span>IN PROGRESS</span><strong>${s.inProgress}</strong><small>Executive actions underway</small></article><article><span>COMPLETED</span><strong>${s.completed}</strong><small>Actions closed</small></article><article><span>REALIZED SAVINGS</span><strong>${money.format(s.realized)}</strong><small>Confirmed annual value</small></article><article><span>IDENTIFIED VALUE</span><strong>${money.format(s.identified)}</strong><small>Tracked opportunity total</small></article></div>`;document.querySelector('#openActionCenter')?.addEventListener('click',openActionTracker)}
function openActionTracker(){const s=actionSummary();openModal('Executive Action Tracker',`<div class="tracker-toolbar"><p>Assign owners, advance status, and record savings after results are verified.</p><button class="outline" id="resetActions">Reset demo actions</button></div><div class="tracker-list">${s.actions.map(a=>`<article class="tracker-item"><div><span class="tracker-status ${a.status}">${statusLabel(a.status)}</span><h3>${a.title}</h3><small>${money.format(a.impact)} identified · Owner: ${a.owner} · Due: ${a.due}</small></div><div class="tracker-controls"><select data-action-status="${a.id}"><option value="identified" ${a.status==='identified'?'selected':''}>Identified</option><option value="in-progress" ${a.status==='in-progress'?'selected':''}>In progress</option><option value="completed" ${a.status==='completed'?'selected':''}>Completed</option></select><input type="number" min="0" step="100" value="${a.realized||''}" placeholder="Realized savings" data-action-realized="${a.id}"><button class="gold" data-save-action="${a.id}">Save</button></div></article>`).join('')}</div><div class="tracker-total"><span>Verified realized savings</span><strong>${money.format(s.realized)}</strong></div>`,'SPRINT 23 · EXECUTIVE EXECUTION');setTimeout(()=>{document.querySelectorAll('[data-save-action]').forEach(btn=>btn.addEventListener('click',()=>{const actions=loadActions();const item=actions.find(a=>a.id===btn.dataset.saveAction);if(!item)return;item.status=document.querySelector(`[data-action-status="${item.id}"]`).value;item.realized=Number(document.querySelector(`[data-action-realized="${item.id}"]`).value)||0;if(item.status==='completed'&&!item.realized)item.realized=item.impact;saveActions(actions);document.querySelector('#modal').classList.remove('open');renderActionSummary();renderOpportunityCenter();toast(`${item.title} updated`)}));document.querySelector('#resetActions')?.addEventListener('click',()=>{saveActions(structuredClone(defaultActions));document.querySelector('#modal').classList.remove('open');renderActionSummary();renderOpportunityCenter();toast('Action tracker reset')})},0)}
function toast(msg){const t=document.querySelector('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1700)}

function bindDashboard(){
  renderOpportunityCenter();
  document.querySelector('#manageAllOpportunities')?.addEventListener('click',openActionTracker);
  document.querySelectorAll('[data-morning-action]').forEach(button=>button.addEventListener('click',()=>{
    const prompts={insurance:'Explain the top priority',processing:'Explain merchant processing fees',cash:'Explain cash flow'};
    document.querySelector('#atlasPanel')?.scrollIntoView({behavior:'smooth',block:'start'});
    setTimeout(()=>answer(prompts[button.dataset.morningAction]),250);
  }));
  document.querySelector('#startMorningInitiative')?.addEventListener('click',()=>{
    setContext('insurance','commercial insurance renewal','insurance','Pull the current policy and renewal terms.',{goal:'Reduce commercial insurance cost',annualImpact:18300,referents:['insurance renewal','premium benchmark','policy riders'],confidence:96,mission:'Reduce commercial insurance cost'});
    conversationState.actionStage=0; conversationState.missionStatus='in progress'; saveMemory();
    document.querySelector('#atlasPanel')?.scrollIntoView({behavior:'smooth',block:'start'});
    setTimeout(()=>answer("Let's start the insurance initiative"),250);
  });
  document.querySelector('#showMorningEvidence')?.addEventListener('click',()=>openModal('Why Atlas ranked insurance first',`<div class="evidence-stack"><article><span>01</span><div><strong>18% above benchmark</strong><p>Current commercial premiums exceed comparable low-claim manufacturers.</p></div></article><article><span>02</span><div><strong>31 months without a market test</strong><p>The coverage has not been competitively rebid recently.</p></div></article><article><span>03</span><div><strong>Overlapping policy riders</strong><p>Two riders appear to cover similar operating risks.</p></div></article></div><div class="detail-box"><span>Modeled annual opportunity</span><strong>$18,300</strong></div>`,'ATLAS EVIDENCE REVIEW'));
  document.querySelector('#remindMorning')?.addEventListener('click',()=>toast('Morning briefing reminder saved for tomorrow'));
  document.querySelectorAll('[data-v25-priority]').forEach(button=>button.addEventListener('click',()=>{
    const item=button.dataset.v25Priority;
    const prompts={
      'Commercial insurance renewal':'Explain the top priority',
      'Vendor invoice review':'Review the vendor invoice',
      'Merchant processing repricing':'Explain merchant processing fees',
      'West-location freight review':'Explain the freight opportunity',
      'Software seat consolidation':'Explain the software opportunity',
      'Collections acceleration':'Explain receivables'
    };
    document.querySelector('#atlasPanel')?.scrollIntoView({behavior:'smooth',block:'start'});
    setTimeout(()=>answer(prompts[item]||`Explain ${item}`),250);
  }));
  renderActionSummary();
  document.querySelector('#actionTrackerBtn')?.addEventListener('click',openActionTracker);
  animateCounts();
  setGreeting();
  restoreConversation();
  updateMemoryIndicator();
  document.querySelectorAll('[data-prompt]').forEach(b=>b.addEventListener('click',()=>answer(b.dataset.prompt)));
  document.querySelector('#chatForm')?.addEventListener('submit',e=>{e.preventDefault();const i=document.querySelector('#chatInput');const v=i.value.trim();if(v){answer(v);i.value=''}});
  document.querySelector('#businessMemoryBtn')?.addEventListener('click',openBusinessMemory);
  document.querySelector('#historyBtn')?.addEventListener('click',openConversationHistory);
  document.querySelector('#newChat')?.addEventListener('click',()=>{localStorage.removeItem(COPILOT_STORAGE_KEY);resetMemory();document.querySelector('#chat').innerHTML='';addMessage('New conversation started. Session chat was cleared, but Atlas retained the company priorities, recurring issues, and prior decisions in Business Memory.','atlas');updateMemoryIndicator();renderFollowUps('')});
  document.querySelector('#reviewChangesBtn')?.addEventListener('click',()=>answer('What changed since yesterday?'));
  document.querySelector('#askBtn')?.addEventListener('click',()=>{document.querySelector('#atlasPanel').scrollIntoView({behavior:'smooth',block:'start'});document.querySelector('#chatInput').focus()});
  document.querySelector('#briefBtn')?.addEventListener('click',()=>document.querySelector('#morningBriefing')?.scrollIntoView({behavior:'smooth',block:'start'}));
  document.querySelectorAll('.priority-row').forEach(row=>row.addEventListener('click',()=>{const p=priorities[Number(row.dataset.priority)];openModal(p.title,`<p>${p.detail}</p><div class="detail-box"><span>Estimated annual impact</span><strong>${p.savings?money.format(p.savings):'Positive operating trend'}</strong></div><div class="modal-button-row"><button class="gold modal-action" id="trackThis">Track this action</button><button class="outline modal-action" id="askThis">Ask Atlas about this</button></div>`,'ATLAS INVESTIGATION');setTimeout(()=>{document.querySelector('#askThis')?.addEventListener('click',()=>{document.querySelector('#modal').classList.remove('open');answer(`Explain ${p.title}`)});document.querySelector('#trackThis')?.addEventListener('click',()=>{document.querySelector('#modal').classList.remove('open');openActionTracker()})},0)}));
}

function showPage(name){
  const main=document.querySelector('#mainPage');
  if(!main) return;
  const target=name==='Dashboard'?'Dashboard':(pageTemplates[name]?name:'Settings');
  document.querySelectorAll('.sidebar-nav [data-nav]').forEach(x=>x.classList.toggle('active',x.dataset.nav===target));
  if(target==='Dashboard'){
    main.innerHTML=dashboardHTML;
    bindDashboard();
  }else{
    main.innerHTML=pageTemplates[target];
    bindFunctionalPage(target);
  }
  document.querySelector('.sidebar')?.classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
}

function downloadFile(filename, content, type='text/plain;charset=utf-8'){
  const blob=new Blob([content],{type});
  const url=URL.createObjectURL(blob);
  const link=document.createElement('a');
  link.href=url; link.download=filename; document.body.appendChild(link); link.click(); link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),500);
}

function exportTransactionsCSV(){
  const rows=[...document.querySelectorAll('#transactionsTable tr')]
    .filter(row=>row.closest('thead') || row.style.display!=='none')
    .map(row=>[...row.querySelectorAll('th,td')].map(cell=>`"${cell.textContent.trim().replace(/"/g,'""')}"`).join(','));
  downloadFile('atlas-transactions-2026-07-30.csv',rows.join('\r\n'),'text/csv;charset=utf-8');
  toast('Transactions exported to CSV');
}

function invoiceHTML(invoice='INV-2026-008', date='August 29, 2026'){
  return `<!doctype html><html><head><meta charset="utf-8"><title>${invoice}</title><style>body{font-family:Arial,sans-serif;max-width:760px;margin:48px auto;color:#172235}header{display:flex;justify-content:space-between;border-bottom:2px solid #caa85e;padding-bottom:18px}.brand{font-size:28px;font-weight:800}.muted{color:#687386}.box{margin-top:32px;padding:24px;background:#f5f7fa;border-radius:12px}.line{display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid #dce2ea}.total{font-size:24px;font-weight:800}.paid{color:#19764d;font-weight:700}</style></head><body><header><div><div class="brand">ATLAS AI</div><div class="muted">SmartLedger</div></div><div><strong>INVOICE</strong><div>${invoice}</div></div></header><div class="box"><div><strong>Bill to</strong><p>Atlas Manufacturing Group<br>Demo Workspace</p></div><div class="line"><span>Professional Plan — monthly subscription</span><span>$299.00</span></div><div class="line"><span>Invoice date</span><span>${date}</span></div><div class="line total"><span>Total</span><span>$299.00</span></div><p class="paid">Paid / scheduled by Visa ending 4321</p></div><p class="muted">This is a demonstration invoice generated by Atlas AI Sprint 23.</p></body></html>`;
}

function handleBillingAction(action){
  if(action==='Upgrade plan'){
    openModal('Choose your SmartLedger plan',`<div class="brief-grid"><article><span>ESSENTIAL</span><strong>$149/mo</strong><small>1 company · 3 users</small></article><article><span>PROFESSIONAL</span><strong>$299/mo</strong><small>3 companies · 10 users</small></article><article><span>ENTERPRISE</span><strong>Custom</strong><small>Unlimited scale</small></article></div><p>Your current Professional Plan is highlighted. Plan changes are demonstrated here and will connect to secure checkout in production.</p><button class="gold modal-action" id="confirmUpgrade">Select Enterprise</button>`,'PLAN MANAGEMENT');
    setTimeout(()=>document.querySelector('#confirmUpgrade')?.addEventListener('click',()=>{document.querySelector('#modal').classList.remove('open');toast('Enterprise plan selected for review')}),0);
    return;
  }
  if(action==='Update payment method'){
    openModal('Update payment method',`<div class="payment-form"><label>Cardholder name<input id="cardName" value="Brian Hess"></label><label>Card number<input id="cardNumber" value="•••• •••• •••• 4321"></label><div class="form-row"><label>Expiration<input value="04/29"></label><label>Security code<input value="•••"></label></div><button class="gold modal-action" id="savePayment">Save payment method</button></div><p class="form-note">Demo only. No payment information is transmitted or stored.</p>`,'SECURE BILLING');
    setTimeout(()=>document.querySelector('#savePayment')?.addEventListener('click',()=>{document.querySelector('#modal').classList.remove('open');toast('Payment method updated')}),0);
    return;
  }
  if(action==='Download next invoice'){
    downloadFile('Atlas-Invoice-INV-2026-008.html',invoiceHTML(),'text/html;charset=utf-8');
    toast('Next invoice downloaded');
    return;
  }
  if(action.startsWith('Download INV-')){
    const invoice=action.replace('Download ','');
    const dates={'INV-2026-007':'July 29, 2026','INV-2026-006':'June 29, 2026','INV-2026-005':'May 29, 2026'};
    downloadFile(`Atlas-Invoice-${invoice}.html`,invoiceHTML(invoice,dates[invoice]||'2026'),'text/html;charset=utf-8');
    toast(`${invoice} downloaded`);
  }
}


const pageIntelligence = {
  'Financial Imports': ['3 recent imports completed successfully.', '9,842 records are available for analysis.', 'No import errors require attention.'],
  'Transactions': ['Two transactions are marked for review.', 'Merchant processing contains a $14,800 annual savings opportunity.', 'Insurance is the highest-impact category today.'],
  'Import History': ['All 12 imports completed successfully.', 'The latest operating-account import added 4,281 records.', 'No duplicate import was detected.'],
  'Payments & Billing': ['Professional Plan is active.', 'Current usage is within plan limits.', 'The next scheduled charge is $299 on August 29, 2026.'],
  'Settings': ['Daily CEO briefings are enabled.', 'Conversation context memory is enabled.', 'Two-factor authentication is active for the owner account.']
};

function askAtlasAboutPage(name){
  const insights=pageIntelligence[name]||['Atlas has reviewed this workspace.'];
  openModal(`Atlas analysis: ${name}`, `<p>Atlas understands the page you are viewing and has prepared these immediate observations:</p><div class="context-insights">${insights.map((x,i)=>`<article><span>0${i+1}</span><strong>${x}</strong></article>`).join('')}</div><button class="gold modal-action" id="continueContextChat">Continue with Atlas</button>`, 'CONTEXTUAL INTELLIGENCE');
  setTimeout(()=>document.querySelector('#continueContextChat')?.addEventListener('click',()=>{
    document.querySelector('#modal').classList.remove('open');
    showPage('Dashboard');
    setTimeout(()=>{document.querySelector('#atlasPanel')?.scrollIntoView({behavior:'smooth',block:'start'});answer(`Review the ${name} page for me`)},50);
  }),0);
}

function inspectTransaction(row){
  const cells=[...row.querySelectorAll('td')].map(x=>x.textContent.trim());
  const [vendor,date,category,amount,status]=cells;
  const notes=status==='Opportunity'?'Atlas detected above-benchmark fees and recommends a pricing review.':status==='Review'?'This item differs from the expected category pattern and should be verified.':'This transaction matches normal historical behavior.';
  openModal(vendor, `<div class="brief-grid"><article><span>AMOUNT</span><strong>${amount}</strong><small>${date}</small></article><article><span>CATEGORY</span><strong>${category}</strong><small>Imported ledger</small></article><article><span>STATUS</span><strong>${status}</strong><small>Atlas classification</small></article></div><p>${notes}</p><button class="gold modal-action" id="askTransaction">Ask Atlas about this transaction</button>`, 'TRANSACTION INTELLIGENCE');
  setTimeout(()=>document.querySelector('#askTransaction')?.addEventListener('click',()=>{document.querySelector('#modal').classList.remove('open');showPage('Dashboard');setTimeout(()=>answer(`Explain the ${vendor} transaction for ${amount}`),50)}),0);
}

function bindFunctionalPage(name){
  document.querySelectorAll('.ask-page').forEach(b=>b.addEventListener('click',()=>askAtlasAboutPage(b.dataset.page)));
  document.querySelectorAll('.transaction-row').forEach(r=>r.addEventListener('click',()=>inspectTransaction(r)));
  document.querySelectorAll('[data-import]').forEach(b=>b.addEventListener('click',()=>openModal(`Import ${b.dataset.import}`,`<p>Selecting a real file will be connected in the production data-integration phase. This demo confirms the complete import workflow and interface.</p><button class="gold modal-action" id="simulateImport">Simulate successful import</button>`,'FINANCIAL IMPORT')));
  document.addEventListener('click',e=>{if(e.target?.id==='simulateImport'){document.querySelector('#modal').classList.remove('open');toast('Demo import completed successfully')}} ,{once:true});
  const search=document.querySelector('#transactionSearch'); const filter=document.querySelector('#transactionFilter');
  function filterRows(){const q=(search?.value||'').toLowerCase();const f=filter?.value||'All categories';document.querySelectorAll('#transactionsTable tbody tr').forEach(r=>{const txt=r.textContent.toLowerCase();r.style.display=txt.includes(q)&&(f==='All categories'||txt.includes(f.toLowerCase()))?'':'none'})}
  search?.addEventListener('input',filterRows);filter?.addEventListener('change',filterRows);
  document.querySelector('#exportTransactions')?.addEventListener('click',exportTransactionsCSV);
  document.querySelectorAll('.billing-action').forEach(b=>b.addEventListener('click',()=>handleBillingAction(b.dataset.billing)));
  document.querySelector('#saveSettings')?.addEventListener('click',()=>toast('Settings saved'));
  document.querySelectorAll('.settings-action').forEach(b=>b.addEventListener('click',()=>toast(`${b.textContent} opened`)));
}

function signOut(){
  sessionStorage.removeItem('atlasSession');
  app.innerHTML=`<div class="signed-out"><section class="signin-card"><span class="brand-mark large">A</span><span class="micro">ATLAS AI · SMARTLEDGER</span><h1>You are signed out.</h1><p>Choose how you would like to enter Atlas AI. Demo mode will never open automatically.</p><button class="gold" id="demoEntry">Enter demo workspace</button><button class="outline" id="accountEntry">Sign in to an account</button><small>Sprint 32 · Secure session cleared</small></section></div>`;
  document.querySelector('#demoEntry').addEventListener('click',()=>location.reload());
  document.querySelector('#accountEntry').addEventListener('click',()=>{document.querySelector('.signin-card').innerHTML=`<span class="brand-mark large">A</span><span class="micro">SECURE ACCOUNT ACCESS</span><h1>Sign in</h1><label class="signin-label">Email<input type="email" placeholder="you@company.com"></label><label class="signin-label">Password<input type="password" placeholder="••••••••"></label><button class="gold" id="signinSubmit">Sign in</button><button class="outline" id="backChoice">Back</button>`;document.querySelector('#signinSubmit').addEventListener('click',()=>toast('Account authentication will connect during production setup'));document.querySelector('#backChoice').addEventListener('click',()=>location.reload())});
}

bindDashboard();
// Scope navigation to the sidebar and delegate clicks so it remains reliable
// after dashboard content is replaced and restored.
document.querySelector('.sidebar-nav')?.addEventListener('click',event=>{
  const button=event.target.closest('[data-nav]');
  if(!button) return;
  showPage(button.dataset.nav);
});
document.querySelector('.signout')?.addEventListener('click',signOut);
document.querySelector('#reloadBtn').addEventListener('click',()=>{if(document.querySelector('.count'))animateCounts();toast('Demo data reloaded')});
document.querySelector('#presentationBtn').addEventListener('click',()=>{document.body.classList.toggle('presentation');toast(document.body.classList.contains('presentation')?'Presentation mode on':'Presentation mode off')});
document.querySelector('#modalClose').addEventListener('click',()=>document.querySelector('#modal').classList.remove('open'));
document.querySelector('#modal').addEventListener('click',e=>{if(e.target.id==='modal')e.currentTarget.classList.remove('open')});
