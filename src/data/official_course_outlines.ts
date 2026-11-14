// UE Business School (Faisalabad Campus) Official Course Outlines
// Extracted from official BBA Revised Curriculum (Pages 19-216)

export interface CourseOutlineTopic {
  week_number: number;
  topic: string;
}

export interface OfficialCourseOutline {
  code: string;
  title: string;
  credit_hours: string;
  weeks: CourseOutlineTopic[];
}

export const OFFICIAL_COURSE_OUTLINES: Record<string, OfficialCourseOutline> = {
  "ENGL1114": {
    "code": "ENGL1114",
    "title": "Functional English",
    "credit_hours": "3 (3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Foundations of Functional English:"
      },
      {
        "week_number": 2,
        "topic": "Vocabulary building (contextual usage, synonyms, antonyms and idiomatic; expressions)"
      },
      {
        "week_number": 3,
        "topic": "Communicative grammar (subject-verb-agreement, verb tenses, fragments, run-ons,; modifiers, articles, word classes, etc.)"
      },
      {
        "week_number": 4,
        "topic": "Word formation (affixation, compounding, clipping, back formation, etc.); Sentence structure (simple, compound, complex and compound-complex) • Sound"
      },
      {
        "week_number": 5,
        "topic": "production and pronunciation; Comprehension and Analysis:"
      },
      {
        "week_number": 6,
        "topic": "Understanding purpose, audience and context; Contextual interpretation (tones, biases, stereotypes, assumptions, inferences, etc.)"
      },
      {
        "week_number": 7,
        "topic": "Reading strategies (skimming, scanning, SQ4R, critical reading, etc.); Active listening (overcoming listening barriers, focused listening, etc.)"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Effective Communication:; Principles of communication (clarity, coherence, conciseness, courteousness,"
      },
      {
        "week_number": 10,
        "topic": "correctness, etc.); Structuring documents (introduction, body, conclusion and formatting)"
      },
      {
        "week_number": 11,
        "topic": "Inclusivity in communication (gender-neutral language, stereotypes, crosscultural; communication, etc.)"
      },
      {
        "week_number": 12,
        "topic": "Public speaking (overcoming stage fright, voice modulation and body language); Presentation skills (organization content, visual aids and engaging the audience)"
      },
      {
        "week_number": 13,
        "topic": "Informal communication (small talk, networking and conversational skills); Professional writing (business e-mails, memos, reports, formal letters, etc.)"
      },
      {
        "week_number": 14,
        "topic": "PRACTICAL REQUIREMENT; As part of the overall learning requirements, students will also be exposed to relevant"
      },
      {
        "week_number": 15,
        "topic": "simulations, role- plays and real-life scenarios and will be required to apply skills acquired; throughout the course in the form of a final project."
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "POLS2112": {
    "code": "POLS2112",
    "title": "A Science of Society",
    "credit_hours": "02(2+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Social Science and Modernity; Definitions"
      },
      {
        "week_number": 2,
        "topic": "Class, Gender, Origin, Caste and Nation.; Socialization and Human Behavior"
      },
      {
        "week_number": 3,
        "topic": "Considering State in Pakistan; Economy"
      },
      {
        "week_number": 4,
        "topic": "How Economy affects Society?; Economic Sociology"
      },
      {
        "week_number": 5,
        "topic": "Definitions; Colonial Histories and their Present"
      },
      {
        "week_number": 6,
        "topic": "Social Movements and Social Change; Collective Behavior"
      },
      {
        "week_number": 7,
        "topic": "Recommended Readings:; Alavi, H.;(1989). Nationhood and the Nationalities in Pakistan’, Economic and Political Weekly, 24(27)."
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Barth, F., (1967). On the study of social change. American anthropologist, 69(6).; Bhambra, G.K., (2011).Talking among themselves? Weberian and Marxist historical sociologies as"
      },
      {
        "week_number": 10,
        "topic": "Eagleton, Terry (1991). What is Ideology? London: Verso Books.; Elaine M. Power (1999). An Introduction to Pierre Bourdieu's Key Theoretical Concepts, Journal for the"
      },
      {
        "week_number": 11,
        "topic": "Foucault, Michel. (1980). POWER/KNOWLEDGE: Selected Interviews and Other Writings 1972-1977; (Ed. Colin Gordon), New York: Pantheon."
      },
      {
        "week_number": 12,
        "topic": "Howarth, David. (2013). Poststructuralism and After: Structure, Agency and Power, Basingstoke:; Palgrave."
      },
      {
        "week_number": 13,
        "topic": "Jalal, A. (ed.) (1995). The colonial legacy in India and Pakistan’, in Democracy and Authoritarianism; in South Asia: A Comparative and Historical Perspective. Cambridge: Cambridge University Press"
      },
      {
        "week_number": 14,
        "topic": "and the British Empire, Oxford: OUP.; Qadeer, M. (2006). Pakistan - Social and Cultural Transformation in a Muslim Nation; New York:"
      },
      {
        "week_number": 15,
        "topic": "Penguin Random House, London.; Scott, J. C. (1999). Seeing like a State: How Certain Schemes to Improve the Human Condition Have"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "GSCI1111": {
    "code": "GSCI1111",
    "title": "What is Science?",
    "credit_hours": "3 (2+1)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction to Science, What qualifies as science?, Branches of Science, Scientific method of"
      },
      {
        "week_number": 2,
        "topic": "study, Prehistory, Mesopotamia & Egypt, Greeks, China, South Asia, Arab/Islamic, European"
      },
      {
        "week_number": 3,
        "topic": "Scientific Method across Civilizations, Vectors and scalars, Frames of reference, Frictional forces."
      },
      {
        "week_number": 4,
        "topic": "Sound and its characteristics, Types of energy, Light and its color. How we see thing, Fields"
      },
      {
        "week_number": 5,
        "topic": "(electric and magnetic), Resistance, resistivity, resistors and their types, capacitance, capacitors and"
      },
      {
        "week_number": 6,
        "topic": "their types, uses of capacitors, ammeter, voltmeter, DC motor, electric generator, UPS."
      },
      {
        "week_number": 7,
        "topic": "Chemistry in our lives, Discoloration of leaves, Food preservatives, the chemistry of baking, Tears; while chopping onions, Sunscreen, Medicines, Origin of life on Earth. Cell: a basic unit of animal"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "life, Basics of animal kingdom, the classification of plants, Importance of plants in different"
      },
      {
        "week_number": 10,
        "topic": "industries (Agriculture, Food, Medicine, Textile, etc.). Structure of Earth, three basic Rocks on"
      },
      {
        "week_number": 11,
        "topic": "earth (Igneous Sedimentary, Metamorphic). Tectonics plates and Earth Quakes."
      },
      {
        "week_number": 12,
        "topic": "List of Experiments:; Value of g using compound pendulum or simple pendulum."
      },
      {
        "week_number": 13,
        "topic": "Determine the Surface tension of water by capillary rise method."
      },
      {
        "week_number": 14,
        "topic": "Preparation and standardization of acid and alkali solutions."
      },
      {
        "week_number": 15,
        "topic": "Microscopic study of animal cell; Temporary slides of T.S of parts of plants: root, stem and leaf"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA1111": {
    "code": "BUSA1111",
    "title": "Introduction to Business",
    "credit_hours": "03 (3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction and meaning of Business Concept of business, characteristics and importance of business"
      },
      {
        "week_number": 2,
        "topic": "Division of business objectives of business, Division or component of business, Key stakeholders in business"
      },
      {
        "week_number": 3,
        "topic": "Sole Proprietorship Concept, Importance, Merits and demerits, Legal status of sole proprietorship"
      },
      {
        "week_number": 4,
        "topic": "Partnership: Concept, Characteristics, Registered and Un-registered partnership, Partnership Deed, Types of partners"
      },
      {
        "week_number": 5,
        "topic": "Partnership Rights & liabilities and duties of partners, Admission and withdrawals of partners, The position of a Minor in partnership, Registration of a firm, Dissolution of a firm"
      },
      {
        "week_number": 6,
        "topic": "Joint Stock Company: Concept, Characteristics, Features, Merits and demerits, Classification of companies, Meaning of private limited company, Single member company (SMC), its Merits and Demerits, conversion of a private limited company to a public limited company"
      },
      {
        "week_number": 7,
        "topic": "Joint stock company Formation stages, Promotion and classification of promoters, Memorandum of Association, Article of Association, Prospectus and its purpose, statement in lieu of prospectus"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Capital: Classes of capital, types of shares, Difference between transfer and transmission of shares, Debentures and its types, Distinction between shares and debentures"
      },
      {
        "week_number": 10,
        "topic": "IPOs, Underwriting and Dividend: Concept of Initial Public Offering (IPO), underwriting of shares, Plough back of profit, Dividend"
      },
      {
        "week_number": 11,
        "topic": "Company Management: Shareholders and their Rights, Basic infrastructural hierarchy of a company, Powers and liabilities of directors"
      },
      {
        "week_number": 12,
        "topic": "Company meetings: Statutory meeting, Annual general meeting, Extra ordinary general meeting and board meeting along with purpose and procedure of calling each meeting"
      },
      {
        "week_number": 13,
        "topic": "winding up a company: Concept and methods of liquidation of a company with necessary procedure"
      },
      {
        "week_number": 14,
        "topic": "Stock Exchanges and Trading of Shares: Introduction of stock exchange, Different types of Trading Transactions, Exposure of transfer of shares / trading through online transaction"
      },
      {
        "week_number": 15,
        "topic": "Business Risk: Concept of risk, mitigation of risk with Basic information about Insurance"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUAS1113": {
    "code": "BUAS1113",
    "title": "Fundamentals of Accounting",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction to Accounting and Business: Nature of Business and Accounting, Types of Businesses, Types of Business Organization, Users of Accounting Information, Role of Ethics in Business, Role of Accounting in Business, Profession of Accounting"
      },
      {
        "week_number": 2,
        "topic": "Fundamental Accounting Concepts, Principles and Policies: The Business Entity Concept, The Reliability (or Objectivity) principle, Historical Cost Convention, Substance Over Form, The Fair Value Principle, The Going-Concern Assumptions, The Realization Principle, The Matching Principle, Money Measurement ( Stable Dollar Assumption ), Materiality"
      },
      {
        "week_number": 3,
        "topic": "Financial Statements: Business Transactions and The Accounting Equation, Effects of Business Transactions on Accounting Elements, Set of Financial Statements, Definition of Income Statement, Components of Income Statement : Revenues, Expenses, Gains and Losses, Accounting for Revenues and Expenses"
      },
      {
        "week_number": 4,
        "topic": "Financial Statements: Statement of Owner’s Equity, Definition of Balance Sheet, Components of Balance Sheet: Assets, Liabilities, Equity, Statement of Cash Flows, Operating, Investing and Financing Activities, Direct Method, Interrelationships Among Financial Statements"
      },
      {
        "week_number": 5,
        "topic": "The Recording Process: Accrual Basis and Cash Basis of Accounting, Chart of Accounts, Phases in Accounting Cycle, Account and its Recording Process, Types of Accounts – Permanent and Temporary, Double Entry Book Keeping System, Rules of Debit and Credit"
      },
      {
        "week_number": 6,
        "topic": "Accounts from incomplete records: single entry system, profit determination under single entry system, profit determination under net-worth method and conversion method"
      },
      {
        "week_number": 7,
        "topic": "Accounts from incomplete records: profit determination under conversion method"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Completing the Accounting Cycle: Flow of Accounting Information, Journalizing and Posting, Closing Entries, Post- Closing Trial Balance, Adequate Disclosure and Types of Information to be Disclosed,"
      },
      {
        "week_number": 10,
        "topic": "Completing the Accounting Cycle: Income Statement, Statement of Owner’s Equity, Balance Sheet, Illustrations and Questions"
      },
      {
        "week_number": 11,
        "topic": "Partnership and company account: an introduction, goodwill for sole trader and partnership,"
      },
      {
        "week_number": 12,
        "topic": "Partnership and company account: Revaluation of partnership assets, partnership dissolution"
      },
      {
        "week_number": 13,
        "topic": "Partnership and company account: An introduction to the financial statements of limited liability companies,"
      },
      {
        "week_number": 14,
        "topic": "Partnership and company account: Purchase of existing partnership and sole traders’ businesses"
      },
      {
        "week_number": 15,
        "topic": "Accounting for branches"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "PAKS1119": {
    "code": "PAKS1119",
    "title": "Ideology & Constitution of Pakistan",
    "credit_hours": "02(2+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction to the Ideology of Pakistan:; Definition and significance of ideology."
      },
      {
        "week_number": 2,
        "topic": "Historical context of the creation of Pakistan (with emphasis on socio-political, religious,; and cultural dynamics of British India between 1857 till 1947)."
      },
      {
        "week_number": 3,
        "topic": "Contributions of founding fathers of Pakistan in the freedom movement including but not; limited to Allama Muhammad Iqbal, Muhammad Ali Jinnah., etc."
      },
      {
        "week_number": 4,
        "topic": "Contributions of women and students in the freedom movement for separate homeland for; Muslims of British India"
      },
      {
        "week_number": 5,
        "topic": "Two-Nation Theory:; Evolution of the Two-Nation Theory (Urdu-Hindi controversy, Partition of Bengal, Simla"
      },
      {
        "week_number": 6,
        "topic": "Deputation 1906, Allama Iqbal's Presidential Address 1930, Congress Ministries 1937; Lahore Resolution 1940)."
      },
      {
        "week_number": 7,
        "topic": "Role of communalism and religious differences.; Introduction to the Constitution of Pakistan:"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Definition and importance of a constitution.; Ideological factors that shaped the Constitution(s) of Pakistan (Objectives Resolution 1949)."
      },
      {
        "week_number": 10,
        "topic": "Overview of constitutional developments in Pakistan.; Constitution and State Structure:"
      },
      {
        "week_number": 11,
        "topic": "Structure of Government (executive, legislature, and judiciary).; Distribution of powers between federal and provincial governments."
      },
      {
        "week_number": 12,
        "topic": "th Amendment and its impact on federalism.; Fundamental Rights, Principles of Policy and Responsibilities:"
      },
      {
        "week_number": 13,
        "topic": "Overview of fundamental rights guaranteed to citizens by the Constitution of Pakistan 1973; (Articles 8-28)."
      },
      {
        "week_number": 14,
        "topic": "Overview of Principles of Policy (Articles 29-40).; Responsibilities of the Pakistani citizens (Article 5)."
      },
      {
        "week_number": 15,
        "topic": "Constitutional Amendments:; Procedures for amending the Constitution."
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "ENGL1120": {
    "code": "ENGL1120",
    "title": "Expository Writing",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Writing Process • Invention • Generating Ideas (collecting information in various forms such as mind maps, tables, lists, charts, etc.) • Identifying Audience, Purpose, and Message • Ordering Information • Chronology for a narrative • Stages of a process • From general to specific and vice versa • From most important to least important • Advantages and disadvantages • Comparison and contrast • Problem solution pattern Drafting • Free Writing • Revising • Editing"
      },
      {
        "week_number": 2,
        "topic": "Reading Skills • Introduction to basic reading skills • Strategies to enhance reading skills • Reading skills for enhancing critical thinking"
      },
      {
        "week_number": 3,
        "topic": "Paraphrasing"
      },
      {
        "week_number": 4,
        "topic": "Cohesion and Coherence ● Cohesive Devices ● Paragraph unity"
      },
      {
        "week_number": 5,
        "topic": "Summary and Précis Writing"
      },
      {
        "week_number": 6,
        "topic": "Creative Writing"
      },
      {
        "week_number": 7,
        "topic": "Letter writing • Different types of professional/business letters, etc. • Letter writing styles of professional/business letters, etc."
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Syllabus Content & Practical Applications for Week 9"
      },
      {
        "week_number": 10,
        "topic": "Syllabus Content & Practical Applications for Week 10"
      },
      {
        "week_number": 11,
        "topic": "Syllabus Content & Practical Applications for Week 11"
      },
      {
        "week_number": 12,
        "topic": "Syllabus Content & Practical Applications for Week 12"
      },
      {
        "week_number": 13,
        "topic": "Syllabus Content & Practical Applications for Week 13"
      },
      {
        "week_number": 14,
        "topic": "Syllabus Content & Practical Applications for Week 14"
      },
      {
        "week_number": 15,
        "topic": "Syllabus Content & Practical Applications for Week 15"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "COMP1116": {
    "code": "COMP1116",
    "title": "Application of Information & Communication",
    "credit_hours": "3 (2+1)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Guided tutorials and exercises to ensure that students are proﬁcient in commonly used software applications such as word processing software (e.g., Microsoft Word), presentation software (e.g., Microsoft PowerPoint), spreadsheet software (cg, Microsoft Excel) among such other tools. Students may be assigned practical tasks that require them to create documents, presentations, and spreadsheets etc."
      },
      {
        "week_number": 2,
        "topic": "Assigning of tasks that involve creating, managing, and organizing ﬁles and folders on both local and cloud storage systems. Students will practice ﬁle naming conventions, creating directories, and using cloud storage solutions (e.g., Google Drive, OneDrive)."
      },
      {
        "week_number": 3,
        "topic": "The use of online learning management systems (LMS) where students can access course materials, submit assignments, participate in discussion forums, and take quizzes or tests. This will provide students with the practical experience with online platforms commonly used in education and the workplace."
      },
      {
        "week_number": 4,
        "topic": "ICT in Health and Well-being: • Health and fitness tracking devices and applications (Google Fit, Samsung Health, Apple , Health Xiaomi, Mi Band, Runkeeper, etc.). • Telemedicine and online health consultations (OLADOC, Sehat Kahani, Marham, etc.)"
      },
      {
        "week_number": 5,
        "topic": "ICT in Personal Finance and Shopping: • Online banking and financial management tools (.lazzCash, Easypaisa, Zong PayMax, 1LINK and MNET, keenu Wallet, etc.). • E-commerce platforms (Darazpk, Telemart, Shophive, etc.)."
      },
      {
        "week_number": 6,
        "topic": "Digital Citizenship and Online Etiquette: • Digital identity and online reputation. • Netiquette and respectful online communication. • Cyberbullying and online harassment."
      },
      {
        "week_number": 7,
        "topic": "Ethical Considerations in Use of ICT Platforms and Tools: • Intellectual property and copyright issues. • Ensuring originality in content creation by avoiding plagiarism and unauthorized use of information sources. • Content accuracy and integrity (ensuring that the content shared through ICT platforms is free from misinformation, fake news, and manipulation). Practical Requirements As part of the overall learning requirements, the course will include:"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Syllabus Content & Practical Applications for Week 9"
      },
      {
        "week_number": 10,
        "topic": "Syllabus Content & Practical Applications for Week 10"
      },
      {
        "week_number": 11,
        "topic": "Syllabus Content & Practical Applications for Week 11"
      },
      {
        "week_number": 12,
        "topic": "Syllabus Content & Practical Applications for Week 12"
      },
      {
        "week_number": 13,
        "topic": "Syllabus Content & Practical Applications for Week 13"
      },
      {
        "week_number": 14,
        "topic": "Syllabus Content & Practical Applications for Week 14"
      },
      {
        "week_number": 15,
        "topic": "Syllabus Content & Practical Applications for Week 15"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "MATH1126": {
    "code": "MATH1126",
    "title": "Exploring Quantitative Skills",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Exploring Quantitative Skills; حکمت، حکایت اوررزمیہ ادب"
      },
      {
        "week_number": 2,
        "topic": "کورس ٹائٹل: حکمت، حکایت اور رزمیہ ادب; کریڈٹ آورز: 2(2+0)"
      },
      {
        "week_number": 3,
        "topic": "لایہ کورس تین اجزا پر مبنی ہے جس میں مطالعہ ادب اور دیگر تخلیقی سرگرمیاں شامل ہیں۔ پہ; جزو حکمت (Wisdom Literature)سے متعلق ہے جو خاص طور پر معروف ادبی شخصیت"
      },
      {
        "week_number": 4,
        "topic": "جانوروں کے تمثیلی کرداردانش و بینش اور خرد افروزی جیسی انسانی صفات کے حامل دکھائے; گئے ہیں ۔ تیسرا جزو اردو کے شیکسپئیر آغا حشرکاشمیری کے رزمیہ \" رستم و سہراب \" کے"
      },
      {
        "week_number": 5,
        "topic": "حکمت ( Wisdom Literature()، حکایت Fables ) اور رزمیہ ادب ( Mythological; Literature ) کے ذریعے طلبہ کی عملیکردارسازی کے ساتھ تہذیبی، جمالیاتی اوراخلاقی تربیت"
      },
      {
        "week_number": 6,
        "topic": "میں لکھنےپڑھنے کی صلاحیت پیدا ہوسکے۔; نثریاور شعری تفہیم کے ذریعے طلبہ میں برداشت ، رواداری اور امن دوستی کےفروغ کے ساتھ"
      },
      {
        "week_number": 7,
        "topic": "I( حکمتWisdom Literature); ( حصہ اول: گلستان سعدیGulistan-E-Sa’di)"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "پانچ منتخب حکایات; ۔ باب اول، حکایت بیست : آوردہ اندکہ نوشیروانِ عادل رار شکار، صفحہ57"
      },
      {
        "week_number": 10,
        "topic": "۔ باب اول، حکایت بیست و نہم: درویشےمجرد بگوشہ صحرائے نشستہ بود، صفحہ 69; ۔ باب دوم، حکایت ششم: زاہدے مہمان پادشاہے بود، صفحہ86"
      },
      {
        "week_number": 11,
        "topic": "لا (حصہ اول : کلیلہ و دمنہ یا خرد افروز از سراج الدینہور: مجلس ترقی ادب، 1963 ء) کا; درج ذیل باب شامل نصاب ہے۔"
      },
      {
        "week_number": 12,
        "topic": "سر محمد اقبال، کلیات اقبال (لاہور:اقبال اکیڈمی، 2021)ء; ۔ ایک مکڑا اور مکھی"
      },
      {
        "week_number": 13,
        "topic": "۔پرندے کی فریاد; ۔ہمدردی"
      },
      {
        "week_number": 14,
        "topic": "کُتب برائے مطالعہ:; ۔شرح بانگ درا (یوسف سلیم چشتی"
      },
      {
        "week_number": 15,
        "topic": ": ۔ اردو ڈراما تاریخ و تنقید (عشرت رحمانی); ۔ فرہنگ آصفیہ ، سید احمد دہلوی"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "ISLA1111": {
    "code": "ISLA1111",
    "title": "Islamic Studies",
    "credit_hours": "2 (2+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction to Islam: • Definition of Islam and its core beliefs. • The Holy Quran (introduction, revelation and compilation). • Hadith and Sunnah (compilation, classification, and significance). • Key theological concepts and themes (Tawhid, Prophethood, Akhirah etc.)."
      },
      {
        "week_number": 2,
        "topic": "Sirah of the Holy Prophet (Peace Be Upon Him) as Uswa-i-Hasana: • Life and legacy of the Holy Prophet PBUH. • Diverse roles of the Holy Prophet PBUH (as an individual, educator, peace maker, leader etc.)."
      },
      {
        "week_number": 3,
        "topic": "Islamic History and Civilization: • World before Islam. • The Rashidun Caliphate and expansion of Islamic rule. • Contribution of Muslim scientists and philosophers in shaping world civilization."
      },
      {
        "week_number": 4,
        "topic": "Islamic Jurisprudence (Fiqh): • Fundamental sources of Islamic jurisprudence. • Pillars of Islam and their significance. • Major schools of Islamic jurisprudence. • Significance and principles of Ijtihad."
      },
      {
        "week_number": 5,
        "topic": "Family and Society in Islam: • Status and rights of women in Islamic teachings. • Marriage, family, and gender roles in Muslim society. • Family structure and values in Muslim society."
      },
      {
        "week_number": 6,
        "topic": "Islam and the Modern World: • Relevance of Islam in the modern world (globalization, challenges and prospects). • Islamophobia, interfaith dialogue, and multiculturalism. • Islamic viewpoint towards socio-cultural and technological changes."
      },
      {
        "week_number": 7,
        "topic": "Syllabus Content & Practical Applications for Week 7"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Syllabus Content & Practical Applications for Week 9"
      },
      {
        "week_number": 10,
        "topic": "Syllabus Content & Practical Applications for Week 10"
      },
      {
        "week_number": 11,
        "topic": "Syllabus Content & Practical Applications for Week 11"
      },
      {
        "week_number": 12,
        "topic": "Syllabus Content & Practical Applications for Week 12"
      },
      {
        "week_number": 13,
        "topic": "Syllabus Content & Practical Applications for Week 13"
      },
      {
        "week_number": 14,
        "topic": "Syllabus Content & Practical Applications for Week 14"
      },
      {
        "week_number": 15,
        "topic": "Syllabus Content & Practical Applications for Week 15"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "HUMN1111": {
    "code": "HUMN1111",
    "title": "Ethics",
    "credit_hours": "2(2+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "What is Ethics?"
      },
      {
        "week_number": 2,
        "topic": "Religious Ethics: A Comparative Study"
      },
      {
        "week_number": 3,
        "topic": "Ethical Values i. Hinduism ii. Budhism iii. Zoroasterianism iv. Judaism v. Christianity and Islam"
      },
      {
        "week_number": 4,
        "topic": "Ethics: Philosophical Perspective i. Ram Chander Ji ii. Mahatma Gandhi iii. Siddharta iv. Amanual Kant v. Saint Paul vi. Flourence Nightingale vii. Aurbindu Ghoos viii. Imam Ghazali"
      },
      {
        "week_number": 5,
        "topic": "Mannerism i. Good Manners ii. Bad Manners"
      },
      {
        "week_number": 6,
        "topic": "Ethics: Social Perspective i. Role of Family ii. Role of Community iii. Role of Educational Institutions"
      },
      {
        "week_number": 7,
        "topic": "Defence Mechanism i. Conscience ii. Sin iii. Self Ego iv. Law v. Crime iii. Character Building"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Regionalism"
      },
      {
        "week_number": 10,
        "topic": "Provincialism Suggested Books • Ethical Theory: An Anthology 5 th ed. Russ Shafer -Landau. Wiley-Blackwell. 2013 • The Fundamentals of Ethics 2nd ed. Russ Shafer-Landau. Oxford University Press. 2011. Note: In addition to the above, any other text or book referred by Instructor can also be included."
      },
      {
        "week_number": 11,
        "topic": "Syllabus Content & Practical Applications for Week 11"
      },
      {
        "week_number": 12,
        "topic": "Syllabus Content & Practical Applications for Week 12"
      },
      {
        "week_number": 13,
        "topic": "Syllabus Content & Practical Applications for Week 13"
      },
      {
        "week_number": 14,
        "topic": "Syllabus Content & Practical Applications for Week 14"
      },
      {
        "week_number": 15,
        "topic": "Syllabus Content & Practical Applications for Week 15"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA3111": {
    "code": "BUSA3111",
    "title": "Principles of Management",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Week Contents; Introduction to Management: Management and managers,"
      },
      {
        "week_number": 2,
        "topic": "management and organizations, managerial roles, management; functions, levels, and skills"
      },
      {
        "week_number": 3,
        "topic": "Historical Background of Management: Management theories and; perspectives"
      },
      {
        "week_number": 4,
        "topic": "Environment: External and internal environment of an organization,; manager’s response to complex and dynamic organizational"
      },
      {
        "week_number": 5,
        "topic": "environment; Decision-Making: Basics of decision making, decision-making"
      },
      {
        "week_number": 6,
        "topic": "process, effective decision making; Planning: Planning process, planning and management,"
      },
      {
        "week_number": 7,
        "topic": "Management by Objectives (MBO); MID TERM EXAM"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "horizontal organization, formalization, Organization Design (OD),; factors affecting OD, forms of OD"
      },
      {
        "week_number": 10,
        "topic": "Leadership: Managers vs. leaders, leadership theories; Controlling: Defining and importance of controlling in"
      },
      {
        "week_number": 11,
        "topic": "organization, control process, control in the organization; Management Functions and Their Domains: In this concluding"
      },
      {
        "week_number": 12,
        "topic": "session the instructor will briefly tell the students about various; management/business domains and how these are linked with"
      },
      {
        "week_number": 13,
        "topic": "various management functions (as given below): Planning: Strategic; management; Organizing: Organization theory and design,"
      },
      {
        "week_number": 14,
        "topic": "Communication, HRM; Leading: Leadership, Organizational; behaviour; Controlling: Operations management, Management"
      },
      {
        "week_number": 15,
        "topic": "information system; Globalization: Globalization and international; business"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA2117": {
    "code": "BUSA2117",
    "title": "Business Ethics and sustainability",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Week Content"
      },
      {
        "week_number": 2,
        "topic": "Introduction & Overview: Understanding Ethics, Ethical; dilemma"
      },
      {
        "week_number": 3,
        "topic": "Defining Business Ethics: What is business ethics? Who are; stakeholders? Resolving ethical dilemmas"
      },
      {
        "week_number": 4,
        "topic": "Organizational Ethics: ethical challenges by organizational"
      },
      {
        "week_number": 5,
        "topic": "functions; Corporate Social Responsibility"
      },
      {
        "week_number": 6,
        "topic": "Innovative and green Business Models: The concepts of the; green economy, green growth, and eco-industries all emphasise"
      },
      {
        "week_number": 7,
        "topic": "sustainable use of resources, so that future generations may not; experience resource scarcities or be exposed to environmental"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "risks and thus be worse off than previous generations."
      },
      {
        "week_number": 10,
        "topic": "Corporate Governance; MID TERM EXAMS"
      },
      {
        "week_number": 11,
        "topic": "The Role of Government; Managing for Sustainability in a Global Context"
      },
      {
        "week_number": 12,
        "topic": "Social sustainability and sustainable development; Blowing the Whistle"
      },
      {
        "week_number": 13,
        "topic": "Ethics and Technology; Ethics and Globalization"
      },
      {
        "week_number": 14,
        "topic": "Making it work… Islamic perspective of business ethics; Understand the Islamic precepts of ethical business conduct"
      },
      {
        "week_number": 15,
        "topic": "and appreciate their relation with the Islamic World view; FINAL EXAMS"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "MATH2118": {
    "code": "MATH2118",
    "title": "Tools for Quantitative Reasoning",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Tools for Quantitative Reasoning"
      },
      {
        "week_number": 2,
        "topic": "Tools for Quantitative Reasoning"
      },
      {
        "week_number": 3,
        "topic": "Tools for Quantitative Reasoning"
      },
      {
        "week_number": 4,
        "topic": "Tools for Quantitative Reasoning"
      },
      {
        "week_number": 5,
        "topic": "Tools for Quantitative Reasoning"
      },
      {
        "week_number": 6,
        "topic": "Tools for Quantitative Reasoning"
      },
      {
        "week_number": 7,
        "topic": "Tools for Quantitative Reasoning"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Key Concepts & Practical Exercises Part 1"
      },
      {
        "week_number": 10,
        "topic": "Key Concepts & Practical Exercises Part 2"
      },
      {
        "week_number": 11,
        "topic": "Key Concepts & Practical Exercises Part 3"
      },
      {
        "week_number": 12,
        "topic": "Key Concepts & Practical Exercises Part 4"
      },
      {
        "week_number": 13,
        "topic": "Key Concepts & Practical Exercises Part 5"
      },
      {
        "week_number": 14,
        "topic": "Key Concepts & Practical Exercises Part 6"
      },
      {
        "week_number": 15,
        "topic": "Key Concepts & Practical Exercises Part 7"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA2115": {
    "code": "BUSA2115",
    "title": "Human Resource Management",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction to HRM Role of HRM in the organization, HRM functions, Authorities of HRM, HRM and other business functions Emerging Human resource management challenges: Trends in HRM, technology and HRM practices, global vs. local HRM practices"
      },
      {
        "week_number": 2,
        "topic": "Legal issues and ethics related to HRM"
      },
      {
        "week_number": 3,
        "topic": "Job Analysis: Steps, Importance, Outcomes: Job description, job specification, Competency based Job descriptions"
      },
      {
        "week_number": 4,
        "topic": "Human Resource Planning: Introduction to HRP, Various Methods of HRP Forecasting"
      },
      {
        "week_number": 5,
        "topic": "Recruitment, Internal and External, Sources of Recruitment, Recruitment effectiveness, Job Application, Job Ads"
      },
      {
        "week_number": 6,
        "topic": "Employee Testing and Selection Importance of Testing & Selection, The Basics of Testing And Selecting Employees, Types of Tests, Background Investigations And Other Selection Methods"
      },
      {
        "week_number": 7,
        "topic": "Employee Testing and Selection Interviewing Candidates, Errors That Can Undermine An Interviews Usefulness, How to Design And Conduct An Effective Interview"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Methods of training, On the job, Off the Job"
      },
      {
        "week_number": 10,
        "topic": "Management Development Programs"
      },
      {
        "week_number": 11,
        "topic": "Performance Management System, performance appraisal, appraisal process, appraisal methods, factors that may distort performance appraisal"
      },
      {
        "week_number": 12,
        "topic": "Performance Appraisal Errors, Interviews"
      },
      {
        "week_number": 13,
        "topic": "Strategic Pay Plans Basic factors In Determining Pay Rates, Pay policies, Strategic Pay Plans, Job Evaluation Methods, Strategic Pay Plans, Steps in developing a competitive pay plan"
      },
      {
        "week_number": 14,
        "topic": "Rewards and Benefits Programs HRIS and Analytical HR (Basic know how)"
      },
      {
        "week_number": 15,
        "topic": "Final Project Presentations FINAL TERM EXAM"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUAS3112": {
    "code": "BUAS3112",
    "title": "Financial Accounting",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Corporations: Organization, Stock Transactions and Dividends: Brief Review of Fundamental Accounting Concepts, Characteristics of Corporation, Forming a Corporation, Stockholder’s Equity, Classes of Shares and Share Capital"
      },
      {
        "week_number": 2,
        "topic": "Corporations: Organization, Stock Transactions and Dividends: Recording of Issue of Shares at Par, Premium and Discount, Accounting for Dividends, Reporting Retained Earnings, Stock Split"
      },
      {
        "week_number": 3,
        "topic": "Inventories: Controlling and Safeguarding Inventory, Nature and Classes of Inventories, Measurement of Inventories as per IAS-2, Reporting Inventory – Periodic and Perpetual Inventory System, Inventory Cost Flow Assumptions"
      },
      {
        "week_number": 4,
        "topic": "Inventories: First in First Out, Weighted Average Cost, Comparison of Inventory Costing Methods, Valuation at Net Realizable Value as per IAS-2, Inventory turnover Ratios,"
      },
      {
        "week_number": 5,
        "topic": "Accounting for Receivables: Classification of Receivables, Accounts Receivable, Notes Receivable, Other Receivables, Concept of Bad Debts/Doubtful Debts and Allowance for Bad Debts"
      },
      {
        "week_number": 6,
        "topic": "Accounting for Receivables: Uncollectible Receivables, Methods of Accounting for Uncollectible Receivable, Notes Receivable, Accounting for Notes Receivable,"
      },
      {
        "week_number": 7,
        "topic": "Accounting for Depreciation: Factors in Computing Depreciation Expense, Methods of Depreciation"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Fixed and Intangible Assets: Nature of Tangible Non-Current Assets (Fixed Assets), Classifying Costs, Costs of Acquiring Tangible Non-Current Assets"
      },
      {
        "week_number": 10,
        "topic": "Fixed and Intangible Assets: Capital Expenditure, Revenue Expenditure, Nature and Purpose of Depreciation"
      },
      {
        "week_number": 11,
        "topic": "Disposal of Fixed Assets: Nature of Intangible Non-Current Assets, Types of Intangible Assets"
      },
      {
        "week_number": 12,
        "topic": "Disposal of Fixed Assets: Amortization of Intangible Assets"
      },
      {
        "week_number": 13,
        "topic": "Statement of Cash Flows: Purpose of Statement of Cash flows, Reporting Cash flows, Cash and Cash Equivalent, Classification of activities,"
      },
      {
        "week_number": 14,
        "topic": "Statement of Cash Flows: Cash flows from Operating Activities, Cash flows from Investing Activities, Cash flows from Financing Activities"
      },
      {
        "week_number": 15,
        "topic": "Statement of Cash Flows: Non-Cash Investing and Financing Activities, Treatment of Interest and Dividend, Preparing the Statement of Cash flow"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA2114": {
    "code": "BUSA2114",
    "title": "Principles of Marketing",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Week Content; Introduction of marketing basic concepts: Definition of"
      },
      {
        "week_number": 2,
        "topic": "marketing, the production concept, the product concept, the; selling concept, the marketing concept, the social marketing"
      },
      {
        "week_number": 3,
        "topic": "Customer value and satisfaction, exchanges and relationship.; Marketing strategy and the marketing mix: Defining a"
      },
      {
        "week_number": 4,
        "topic": "analysis. Developing strategies for growth and downsizing; Marketing Environment: The micro-environment,"
      },
      {
        "week_number": 5,
        "topic": "Macroenvironment, major forces in the company; environment and their impact."
      },
      {
        "week_number": 6,
        "topic": "personal and psychological factors. Types of buying decision; behavior. The buyer decision process"
      },
      {
        "week_number": 7,
        "topic": "segmentation, types of segmentation, requirements for; effective segmentation. Market targeting, selecting target"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "positioning statement.; MID TERM EXAMS"
      },
      {
        "week_number": 10,
        "topic": "services and experiences, levels of product, products and; services classifications, products and services decisions,"
      },
      {
        "week_number": 11,
        "topic": "building strong brands.; Price and Strategy: what is a price? Major pricing strategies,"
      },
      {
        "week_number": 12,
        "topic": "market penetration pricing. Product mix pricing strategies,; price adjustment strategies."
      },
      {
        "week_number": 13,
        "topic": "Product life cycle strategies for introductory, growth,; maturity and decline stage."
      },
      {
        "week_number": 14,
        "topic": "The Promotion mix: Elements of promotion mix,; advertising, direct marketing, sales promotion, personal"
      },
      {
        "week_number": 15,
        "topic": "Needs & Significance of Intermediaries, Functions of; Intermediaries, Channels of Distribution, Selecting Channel"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "ECON1111": {
    "code": "ECON1111",
    "title": "Principles of Microeconomics",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction: Economics, Micro-economics, Macro-economics,; Scarcity and choice, Rational Behavior, Limited Income, Unlimited"
      },
      {
        "week_number": 2,
        "topic": "Wants, A Budget Line, Factors of Productions; Production Possibility Curve: Definition, Assumptions, Law of"
      },
      {
        "week_number": 3,
        "topic": "Increasing Opportunity Cost; The Market System: Introduction of four economic systems."
      },
      {
        "week_number": 4,
        "topic": "Capitalism, Socialism, Mixed Economies and Islamic Economic; Demand, Supply and Market Equilibrium: Law of demand, the"
      },
      {
        "week_number": 5,
        "topic": "demand curve, Market Demand, Changes in Demand, Changes in; Quantity Demanded, Law of Supply, the Supply Curve, Market"
      },
      {
        "week_number": 6,
        "topic": "Supply, Change in Supply Curve, Changes in Quantity Supplied,; Market Equilibrium, Equilibrium Prices and Quantity, Changes in"
      },
      {
        "week_number": 7,
        "topic": "Supply, Demand and Equilibrium; Elasticity: Price Elasticity of Demand, Formula, Determinants of"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "MID TERM EXAM; Consumer Behaviour: Law of Diminishing Marginal Utility, Total"
      },
      {
        "week_number": 10,
        "topic": "Utility, Marginal Utility and their relations, Consumer Choice and the; Budget Constraint, Utility Maximizing Rule, The Indifference Curve,"
      },
      {
        "week_number": 11,
        "topic": "Problem Solving, Class Activity; The Cost of Production: Economic Cost and Financial Cost, Short"
      },
      {
        "week_number": 12,
        "topic": "Run Production Costs, Long Run Production Cost; Pure Competition in The Short Run: Pure competition"
      },
      {
        "week_number": 13,
        "topic": "characteristics, Demand seen in SR, Profit Maximization in the SR,; Supply Curve, Pure competition in the Long Run"
      },
      {
        "week_number": 14,
        "topic": "Pure Monopoly: Characteristics of Monopoly, Demand, Output and; Discrimination of Price"
      },
      {
        "week_number": 15,
        "topic": "Monopolistic Competition and Oligopoly: Characteristics,; determination of Price and Output in Monopolistic Competition in short"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "ECON1116": {
    "code": "ECON1116",
    "title": "Principles of Macroeconomics",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction: Economics, Micro-economics, Macro-economics, The Miracle of Modern"
      },
      {
        "week_number": 2,
        "topic": "Economic Growth"
      },
      {
        "week_number": 3,
        "topic": "Measuring Domestic Output and National Income: Gross Domestic Product, The; Expenditure Approach, The Income Approach, Other National Accounts, Nominal GDP"
      },
      {
        "week_number": 4,
        "topic": "versus Real GDP, Shortcomings"
      },
      {
        "week_number": 5,
        "topic": "Economic Growth: Economic growth, modern economic growth, Determinants of Growth,; Production Possibility Analysis"
      },
      {
        "week_number": 6,
        "topic": "Business Cycles, Unemployment and Inflation: Phases of Business cycle, Measurement of"
      },
      {
        "week_number": 7,
        "topic": "unemployment, Types of unemployment, Inflation meaning, measurement and facts; Basics Macroeconomics Relationship: The income consumption and income saving"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "relationships, The Interest rate investment, The Multiplier effects."
      },
      {
        "week_number": 10,
        "topic": "The Aggregate Expenditures Model: Assumptions, Consumption and Investment"
      },
      {
        "week_number": 11,
        "topic": "schedules, Changes in Equilibrium GDP and the Multiplier, Adding the Public Sector,; Equilibrium versus Full Employment GDP, Recessionary expenditure gap and inflationary"
      },
      {
        "week_number": 12,
        "topic": "expenditure gap."
      },
      {
        "week_number": 13,
        "topic": "Aggregate Demand and Supply: Aggregate Demand, changes in Aggregate Demand,; Aggregate Supply, Changes in Aggregate Supply, The Diamond Water Paradox,"
      },
      {
        "week_number": 14,
        "topic": "Equilibrium and Changes in Equilibrium."
      },
      {
        "week_number": 15,
        "topic": "Fiscal Policy and Monetary Policy: Introduction and Tools of Fiscal Policy, Introduction; and Tools of Monetary Policy."
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA2112": {
    "code": "BUSA2112",
    "title": "Business Finance",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "What is Business Finance? The understanding of business environment"
      },
      {
        "week_number": 2,
        "topic": "Forms of Business: Sole proprietorships, partnerships, corporations, limited liability companies (LLCs)"
      },
      {
        "week_number": 3,
        "topic": "Financial Environment: The financial intermediaries, Financial Markets: money market, capital market, primary market, secondary market"
      },
      {
        "week_number": 4,
        "topic": "Ratio Analysis: Explanation and formation of income statement & balance sheet, horizontal and vertical analysis"
      },
      {
        "week_number": 5,
        "topic": "Liquidity or short-term solvency ratios, Turnover or asset management ratios"
      },
      {
        "week_number": 6,
        "topic": "Profitability ratios, Margin ratios and their explanations"
      },
      {
        "week_number": 7,
        "topic": "Solvency ratios, leverage, and market-based ratios"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "The Time Value of Money: Difference between simple and compound interest, future and present value of single sum"
      },
      {
        "week_number": 10,
        "topic": "Future and present value of mixed streams and annuities (ordinary and due)"
      },
      {
        "week_number": 11,
        "topic": "Cash Planning: Sales forecast, Cash Receipt schedule, ,"
      },
      {
        "week_number": 12,
        "topic": "Preparation of Cash Disbursement schedule and Cash Budget"
      },
      {
        "week_number": 13,
        "topic": "Working capital Management: Concepts of inventory, receivable and payable management"
      },
      {
        "week_number": 14,
        "topic": "Cash Flow Estimation: The balance sheet, liquidity, debt versus equity, market value versus book value"
      },
      {
        "week_number": 15,
        "topic": "The income statement, non-cash items, identification of cash inflows and outflows"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA3120": {
    "code": "BUSA3120",
    "title": "Mercantile Law",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "The Companies Act 2017: Introduction and Highlights of The Companies Act; Incorporation of Company: Incorporation Process; Memorandum and"
      },
      {
        "week_number": 2,
        "topic": "Articles of the Association; Prospectus; Officers of the Company: Directors; Chief Executive; Secretary and;"
      },
      {
        "week_number": 3,
        "topic": "Auditors.; Listing in Stock Exchange and Associated Rules: Offer of shares;"
      },
      {
        "week_number": 4,
        "topic": "Stock Exchanges; Listing Rules of Stock Exchanges; Shares and Associated Rules: Applications and Allotment of Shares; Issuance"
      },
      {
        "week_number": 5,
        "topic": "of Shares; Letters of Regret; Share Certificates; Transfer and Transmission of; Shares; Flotation of Corporate Securities; Issuance and Redemption of"
      },
      {
        "week_number": 6,
        "topic": "Meeting and Associated Rules: Types of Meetings (Company and Directors; Meetings, Annual General Meeting); Notice of Meetings; Agenda of Meetings;"
      },
      {
        "week_number": 7,
        "topic": "Minutes of the Meetings; Quorum of Meetings; Voting, Proxies, Resolutions;; Declaration of Dividend; Dividend Warrants; Bonus and Rights Issue"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": ": Introduction of NBFC; Formation Procedure; Obligations, Limitations;; Duties and Rights of NBFC"
      },
      {
        "week_number": 10,
        "topic": "The Contract Act, 1872: Difference between Contract and agreement; Void;; Voidable and enforceable agreements"
      },
      {
        "week_number": 11,
        "topic": "Elements/ingredients of a contract: Proposal, Acceptance and Revocation;; Void Agreements; Quasi Contracts; Contingent Contracts; Free Consent;"
      },
      {
        "week_number": 12,
        "topic": "Capacity.; Void Contract and Voidable Contract: Coercion; Undue Influence; Fraud;"
      },
      {
        "week_number": 13,
        "topic": "Mistake; Misrepresentation; Performance of Contract: Contracts Which Must Be Performed; Time and"
      },
      {
        "week_number": 14,
        "topic": "Payments; Contracts Which Need Not to be Perform; Breach of Contract: Anticipatory Breach of Contract; Actual Breach of"
      },
      {
        "week_number": 15,
        "topic": "Contract; Remedies of Breach of Contract: Remedies; Doctrine of Frustration; Various"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA3116": {
    "code": "BUSA3116",
    "title": "Money and Banking",
    "credit_hours": "3",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction to Monetary system Monetary system and its components"
      },
      {
        "week_number": 2,
        "topic": "Introduction to Money and its evolution Evolution of money from Barter system, commodity money, metallic money"
      },
      {
        "week_number": 3,
        "topic": "Evolution of money Paper money, bank money (including role of goldsmiths in evolution of banking) and crypto currency."
      },
      {
        "week_number": 4,
        "topic": "Economic Financial system Respective types, advantages and disadvantages of all types of money. Role of money in economic system"
      },
      {
        "week_number": 5,
        "topic": "Central Banking Evolution of Central Banking, Principles / Objectives, Functions of Central Bank and State bank of Pakistan"
      },
      {
        "week_number": 6,
        "topic": "Role of central bank to control money supply Monetary policy, Introduction, Importance of monetary policy, Monetary policy tools, Discussion about efficiency of monetary policy"
      },
      {
        "week_number": 7,
        "topic": "Financial Institutions Different kinds / types of banks, Banks and their role in financial system"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Commercial Banking: Basics of commercial banking, departmental structure, their functions and respective roles in economic growth"
      },
      {
        "week_number": 10,
        "topic": "Liability side of commercial banks: Bank Accounts: Opening and operations along with characteristics of Current account, Savings account, Fixed Account / fixed deposit"
      },
      {
        "week_number": 11,
        "topic": "Asset side of commercial banks: Bank Advances: Fund based and Non Fund based advances, Basic knowledge and characteristics of Running Finance / overdraft, Term Finance, Discounting & Purchase of Bills and letter of credit"
      },
      {
        "week_number": 12,
        "topic": "Negotiable Instruments: Concept, Characteristics of negotiable instruments. Definition, use, essentials and applicability of 1- Promissory Note 2- Bills of Exchange and 3- Cheques along with its types"
      },
      {
        "week_number": 13,
        "topic": "Credit Creation: Concept, Mechanism, Benefits and issues of credit creation"
      },
      {
        "week_number": 14,
        "topic": "Prudential Regulations issued by SBP: Introduction, Preface, Summarized information and Islamic banking about prudential regulations, Frequently asked questions available at SBP website"
      },
      {
        "week_number": 15,
        "topic": "Islamic Banking: Difference between conventional and Islamic banking, Concept of Riba and its types (Riba an Nassiyah, Riba al Fadl), Basic features of Islamic Banking"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA1114": {
    "code": "BUSA1114",
    "title": "Introduction to Entrepreneurship",
    "credit_hours": "2(2+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "“Entrepreneurship: Successfully Launching New Ventures” by Bruce R. Barringer and R. Duace Ireland."
      },
      {
        "week_number": 2,
        "topic": "“Entrepreneurship: Theory, Process and Practice” by Donald F. Kuratko."
      },
      {
        "week_number": 3,
        "topic": "“New Venture Creation: Entrepreneurship for the 21st Century” by Jeffry A. Timmons, Stephen Spinelli Jr. and Rob Adams."
      },
      {
        "week_number": 4,
        "topic": "“Entrepreneurship: A Real-World Approach” by Rhonda Abrams."
      },
      {
        "week_number": 5,
        "topic": "“The Lean Start-up: How Today’s Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses” by Eric Ries."
      },
      {
        "week_number": 6,
        "topic": "“Effectual Entrepreneurship” by Stuart Read, Saras Sarasvathy, Nick Dew, Robert Wiltbank and Anne-Veleric Ohlsson."
      },
      {
        "week_number": 7,
        "topic": "Regulatory Requirements to Establish Enterprises in Pakistan: • Types of enterprises (e.g., sole proprietorship, partnership, private limited companies etc.) • Intellectual property rights and protection; • Regulatory requirements to register an enterprise in Pakistan, with special emphasis on export firms; • Taxation and financial reporting obligation. PRACTICAL REQUIREMENTS As per of the overall learning requirements, students shall be tasked with creating and presenting a comprehensive business plan at the end of the course for a hypothetical or oral business idea. This practical exercise shall allow them to apply the knowledge, skills, and abilities acquired in the course to develop a feasible business plan and where possible explore the possibility of implementing the plan with support and assistance from established business- persons and entrepreneurs. SUGGESTED INSTRUCTIONAL / LEADING MATERIAL"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Syllabus Content & Practical Applications for Week 9"
      },
      {
        "week_number": 10,
        "topic": "Syllabus Content & Practical Applications for Week 10"
      },
      {
        "week_number": 11,
        "topic": "Syllabus Content & Practical Applications for Week 11"
      },
      {
        "week_number": 12,
        "topic": "Syllabus Content & Practical Applications for Week 12"
      },
      {
        "week_number": 13,
        "topic": "Syllabus Content & Practical Applications for Week 13"
      },
      {
        "week_number": 14,
        "topic": "Syllabus Content & Practical Applications for Week 14"
      },
      {
        "week_number": 15,
        "topic": "Syllabus Content & Practical Applications for Week 15"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "POLS2111": {
    "code": "POLS2111",
    "title": "Civics and Community Engagement",
    "credit_hours": "(2+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Community Storytelling: Students can collect and share stories from community members This could be done through oral histories, interviews, or multimedia presentations that capture the lived experiences and perspectives of diverse individuals."
      },
      {
        "week_number": 2,
        "topic": "Community Event Planning: Students can organize a community event or workshop that addresses a specific issue or fosters community interaction. This could be a health fair, environmental cleanup, cultural festival, or educational workshop."
      },
      {
        "week_number": 3,
        "topic": "Service-Learning: Students can collaborate with a local nonprofit organization or community group. They can actively contribute by volunteering their time and skills to address a particular community need, such as tutoring, mentoring, or supporting vulnerable populations."
      },
      {
        "week_number": 4,
        "topic": "Cultural Exchange Activities: Students can organize a cultural exchange event that celebrates the diversity within the community. This could include food tastings. performances, and presentations that promote cross-cultural understanding."
      },
      {
        "week_number": 5,
        "topic": "Community Engagement • Concept, nature and characteristics of community • Community development and social cohesion • Approaches to effective community engagement. • Case studies of successful community driven initiatives."
      },
      {
        "week_number": 6,
        "topic": "Advocacy and Activism • Public discourse and public opinion • Role of advocacy in addressing social issues. • Social action movements."
      },
      {
        "week_number": 7,
        "topic": "Digital Citizenship and Technology • The use of digital platforms for civic engagement. • Cyber ethics and responsible use of social media. • Digital divides and disparities (access, usage, socioeconomic, geographic, etc.) and their impacts on citizenship."
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Syllabus Content & Practical Applications for Week 9"
      },
      {
        "week_number": 10,
        "topic": "Syllabus Content & Practical Applications for Week 10"
      },
      {
        "week_number": 11,
        "topic": "Syllabus Content & Practical Applications for Week 11"
      },
      {
        "week_number": 12,
        "topic": "Syllabus Content & Practical Applications for Week 12"
      },
      {
        "week_number": 13,
        "topic": "Syllabus Content & Practical Applications for Week 13"
      },
      {
        "week_number": 14,
        "topic": "Syllabus Content & Practical Applications for Week 14"
      },
      {
        "week_number": 15,
        "topic": "Syllabus Content & Practical Applications for Week 15"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "PAKS1111": {
    "code": "PAKS1111",
    "title": "Pakistan Studies",
    "credit_hours": "2(2+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Specific Objectives of course: To familiarize the students with political and religious"
      },
      {
        "week_number": 2,
        "topic": "backdrop of the ideology of Pakistan and other related events concerning the postpartition"
      },
      {
        "week_number": 3,
        "topic": "history."
      },
      {
        "week_number": 4,
        "topic": "Develop vision of historical perspective, government, politics, contemporary Pakistan,"
      },
      {
        "week_number": 5,
        "topic": "ideological background of Pakistan, Study the process of governance, national"
      },
      {
        "week_number": 6,
        "topic": "development, issues arising in the modern age and posing challenges to Pakistan."
      },
      {
        "week_number": 7,
        "topic": "Historical Perspective: Ideological rationale with special reference to Sir Syed Ahmed"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Khan, Allama Muhammad Iqbal and Quaid-i-Azam Muhammad Ali Jinnah, factors"
      },
      {
        "week_number": 10,
        "topic": "leading to Muslim separatism, people and land, Muslim advent location and geophysical"
      },
      {
        "week_number": 11,
        "topic": "features."
      },
      {
        "week_number": 12,
        "topic": "Government and Politics in Pakistan: Political and constitutional phases; 1947-58,"
      },
      {
        "week_number": 13,
        "topic": ", 1971-77, 1977-88, 1988-99, 1999 onward."
      },
      {
        "week_number": 14,
        "topic": "Contemporary Pakistan: Economic institutions and issues, Society and social structure,"
      },
      {
        "week_number": 15,
        "topic": "Ethnicity, Foreign policy of Pakistan and challenges, Futuristic outlook of Pakistan."
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA3114": {
    "code": "BUSA3114",
    "title": "Business Communication I",
    "credit_hours": "3 (3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Effective communication in Business: Definition of business communication, Importance; of communication, Purpose of communication, Means of communication, Modes of"
      },
      {
        "week_number": 2,
        "topic": "communication, Formal and Informal (Grapevine) Communication, Oral and Written; Communication, Non-Verbal Communication, Downward and Upward Communication,"
      },
      {
        "week_number": 3,
        "topic": "cycle, Interpersonal communication and its principles, Interpersonal communication is; unavoidable, Interpersonal communication is irreversible, Interpersonal communication"
      },
      {
        "week_number": 4,
        "topic": "relationship dimensions, Interpersonal communication is symbolic, Interpersonal; communication is rule-governed, Interpersonal communication is learned."
      },
      {
        "week_number": 5,
        "topic": "Physical, Physiological, Psychological and Semantic, Redundancy , The importance of; context – Physical context, Cultural context, Distortion versus Noise, Perception, Selective"
      },
      {
        "week_number": 6,
        "topic": "of verbal interaction, Polarization, Intentional Orientation, All ness, Static Evaluation,; Indiscrimination"
      },
      {
        "week_number": 7,
        "topic": "Concreteness, Clarity, Courtesy, and Correctness; Preparing Effective Business Message: Three-step writing process, Direct and Indirect"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Persuasive messages; Appearance, Design and Drafting of business messages: Business letters and standard"
      },
      {
        "week_number": 10,
        "topic": "parts, Specialized Parts of business letters, Style of business messages – Full Block Form,; Business to Business and Business to Customers Letters,"
      },
      {
        "week_number": 11,
        "topic": "Answering/Giving Information Enquiry Letters, Making Claims and Adjustments,; Recommendation Letter"
      },
      {
        "week_number": 12,
        "topic": "Letters or Good will messages, Letter congratulating on a promotion, Letter expressing; gratitude/ thanks, Letter regretting price increase"
      },
      {
        "week_number": 13,
        "topic": "Terminating Employment Letter, Rejecting Job Application, Letter to raise grievance at; work e.g.: equity in pay, discrimination, Letter of condolence to an employee"
      },
      {
        "week_number": 14,
        "topic": "Newspaper announcements for business, Announcing new product or service through; advertisement, Announcement of death of employee/ Obituary in newspaper, Announcement"
      },
      {
        "week_number": 15,
        "topic": "Public service announcement on social and environmental issues e.g.: Use of Plastic; bags, Save Water / trees, Safe Drive, Food wastage, Animal Abuse"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA5121": {
    "code": "BUSA5121",
    "title": "Taxation Management",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Income Tax Laws in Pakistan; History of Income Tax Law, Income Tax Ordinance, 1979, Income Tax"
      },
      {
        "week_number": 2,
        "topic": "Ordinance, 2001, Scope of Income Tax Laws, Extent of Income Tax Ordinance,; Components of Income Tax Law, Income Tax Ordinance, 2001, Income Tax"
      },
      {
        "week_number": 3,
        "topic": "Ordinance.; Definitions of Terms (Section 2)"
      },
      {
        "week_number": 4,
        "topic": "Importance and understanding of Income Tax terms/concepts/definitions.; All the definitions given under section 2 of Income Tax Ordinance 2001(updated) (2nd"
      },
      {
        "week_number": 5,
        "topic": "Income Exempt from Tax (section 41 to 51); Importance of understanding of Income Exempt from Tax."
      },
      {
        "week_number": 6,
        "topic": "Income Tax Exemptions given under section 41 to 51 of Income Tax Ordinance; (updated)."
      },
      {
        "week_number": 7,
        "topic": "Overview of all the heads of income with examples. Understanding, features and scope of; salary Income. Minimum of Time Scale of Basic Salary, Basic Salary and Salary"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "such as Accommodation, Conveyance, Medical Charges, Hospital Charges or Medical; Allowance, Loan to Employees, Special Allowance, Provident Fund etc."
      },
      {
        "week_number": 10,
        "topic": "Computation of Salary Income, Deductions from total Income, Calculation of Gross Tax,; Block of Income under FTR, Block of Income under separate block, Tax Credits."
      },
      {
        "week_number": 11,
        "topic": "individuals.; Computation of Income from Property"
      },
      {
        "week_number": 12,
        "topic": "Chargeable to Tax (RCT), Admissible Deductions and Numerical Demonstration.; Computation of Income from Business and Capital Gains"
      },
      {
        "week_number": 13,
        "topic": "Capital and revenue items, Concept of income from capital gains, Computation of; capital gains, Deductions of capital losses, Capital gains on disposal of securities,"
      },
      {
        "week_number": 14,
        "topic": "Computation of Income from Other Sources; Understanding the concept of Income from other sources, Examples of Income from"
      },
      {
        "week_number": 15,
        "topic": "Heads Rather Treated as income from Other Sources, Admissible Deductions.; Income Tax Allied Topics, Sales Tax"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA2113": {
    "code": "BUSA2113",
    "title": "Cost and Management Accounting",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Cost Accounting Concepts and Objectives: Definition, Concept and Scope"
      },
      {
        "week_number": 2,
        "topic": "of Cost Accounting, Cost elements, Nature and objective, The Cost; Department,"
      },
      {
        "week_number": 3,
        "topic": "Costs: Concepts, Uses and Classification: Product and period cost, Direct; and indirect cost, Fixed and variable cost, Mixed cost, Sunk Cost, Joint Cost"
      },
      {
        "week_number": 4,
        "topic": "and By-Product Cost, Opportunity Cost, Flow of Costs in a Manufacturing; enterprise"
      },
      {
        "week_number": 5,
        "topic": "Statement of cost of goods manufactured and sold statement: Adjustment; for Variance, Cost of Goods Sold, Net Profit/Net loss, Entire Production,"
      },
      {
        "week_number": 6,
        "topic": "Job Order Costing: Cost Summary, Cost Accumulation Procedures, Net; Profit/Net loss, Entire Production, Cost Volume Profit Analysis, Break-even"
      },
      {
        "week_number": 7,
        "topic": "Analysis, Cost-volume Profit Analysis; Planning and Control of Materials: Procedure for material procurement and"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "use, Material costing methods; MID TERM EXAMS"
      },
      {
        "week_number": 10,
        "topic": "Perpetual and Periodic Accounting System: Inventory valuation at cost or; market whichever is lower, Procedure for spoiled, scrap and defective work,"
      },
      {
        "week_number": 11,
        "topic": "EOQ, Inventory level and reserve stocks, Valuation of inventory, Planning; materials requirement , Materials control"
      },
      {
        "week_number": 12,
        "topic": "Process Costing: Cost of Production Report, First in First Out (FIFO), Last; in First Out (LIFO), Weighted Average"
      },
      {
        "week_number": 13,
        "topic": "Planning and Control of Labor: Productivity and labor costs, Incentive; wage plans,"
      },
      {
        "week_number": 14,
        "topic": "Factory Overhead: Procedure of factory overheads including apportionment,; Applied and actual FOH, under applied FOH"
      },
      {
        "week_number": 15,
        "topic": "Overtime plans, Bonus payments, Vocation pay guaranteed annual wage; plans, apprenticeship and training programs"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA3128": {
    "code": "BUSA3128",
    "title": "Knowledge Management and Organizational Learning",
    "credit_hours": "03 (3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Sr. No. Topics"
      },
      {
        "week_number": 2,
        "topic": "What is knowledge? Types of knowledge. Characteristics of tacit and explicit knowledge.; Knowledge as a strategic asset. Understanding Knowledge management."
      },
      {
        "week_number": 3,
        "topic": "Three stages of knowledge management. Background and issues of knowledge management process; Knowledge generation in organizations"
      },
      {
        "week_number": 4,
        "topic": "Knowledge Based Theory of the Firm. Social capital. The knowledge management team and learning organization."
      },
      {
        "week_number": 5,
        "topic": "Knowledge Sharing and Communities of Practice; The Knowledge Creation Process"
      },
      {
        "week_number": 6,
        "topic": "Platform of knowledge creation.; Knowledge management model"
      },
      {
        "week_number": 7,
        "topic": "Midterm exam; Knowledge as a Competitive Factor"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Developing a knowledge strategy"
      },
      {
        "week_number": 10,
        "topic": "Building a Knowledge Management Rationale; The Role of Organizational Culture in Knowledge Management"
      },
      {
        "week_number": 11,
        "topic": "Implementing Knowledge Management in Organization; Theory of organizational learning and what it entails. In the"
      },
      {
        "week_number": 12,
        "topic": "most general terms,"
      },
      {
        "week_number": 13,
        "topic": "the organizational learning perspective--adaptation and; learning from experience."
      },
      {
        "week_number": 14,
        "topic": "How organizations learn?; Organizational elements and Organizational Learning"
      },
      {
        "week_number": 15,
        "topic": "Final Term; Learning Recourses:"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA3129": {
    "code": "BUSA3129",
    "title": "Statistical Analysis for Business",
    "credit_hours": "3",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction to Business Statistics:; Importance of statistics in business research."
      },
      {
        "week_number": 2,
        "topic": "Types of statistics and measurement scales.; Types of data and variables."
      },
      {
        "week_number": 3,
        "topic": "Data Presentation and Central Tendency:; Grouped vs. ungrouped data."
      },
      {
        "week_number": 4,
        "topic": "Frequency distribution and graphical representation.; Measures of central tendency: mean, median, mode."
      },
      {
        "week_number": 5,
        "topic": "Dispersion and Variability Analysis:; Measures of dispersion: range, variance, standard deviation."
      },
      {
        "week_number": 6,
        "topic": "Coefficient of variation and its implications.; Interpreting dispersion for decision-making."
      },
      {
        "week_number": 7,
        "topic": "Introduction to probability terminology.; Probability rules and applications in business contexts."
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Using normal distribution for business analysis.; Estimation and Regression Analysis:"
      },
      {
        "week_number": 10,
        "topic": "Point and interval estimation concepts.; Least-Squares Regression Line: properties and assumptions."
      },
      {
        "week_number": 11,
        "topic": "Coefficient of determination and correlation coefficient.; Multivariate Data Analysis and Factor Analysis:"
      },
      {
        "week_number": 12,
        "topic": "Multivariate data analysis overview for business.; Validity concepts and their relevance."
      },
      {
        "week_number": 13,
        "topic": "Confirmatory Factor Analysis: validating assumptions.; Multiple Regression and Assumption Testing:"
      },
      {
        "week_number": 14,
        "topic": "Understanding BLUE (Best Linear Unbiased Estimators).; Applying multiple regression analysis in business."
      },
      {
        "week_number": 15,
        "topic": "Interpretation and Application:; Emphasis on interpretation of statistical results."
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "ISLA1122": {
    "code": "ISLA1122",
    "title": "ISLA1122",
    "credit_hours": "3",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Seerat of the Holy Prophet; Muhammad (SAW)"
      },
      {
        "week_number": 2,
        "topic": "Total Teaching weeks; ۔طلباءکومطالعہ سیرۃطیبہ کی ضرورت واہمیت سےآگاہ کرنا"
      },
      {
        "week_number": 3,
        "topic": "S.No. Title Description; سیرۃالنبی صلی اللہ علیہ وسلم :"
      },
      {
        "week_number": 4,
        "topic": "۔ مطالعہ سیرت کے شخصیت و کردار پر اثرات; پیغمبر اسلام صلی اللہ علیہ وسلم کی"
      },
      {
        "week_number": 5,
        "topic": "۔ حرب فجار اور حلف الفضول; اللہ تعالی کے پیغام کی تبلیغ واشاعت ۱۔ہجرت حبشہ"
      },
      {
        "week_number": 6,
        "topic": "ہجرت مدینہ اور انصار و یہود ۱۔مؤاخات مدینہ کی عصر حاضر میں اہمیت; ۔ میثاق مدینہ کے تناظر میں یہود و نصار ی کے ساتھ"
      },
      {
        "week_number": 7,
        "topic": "حضورصلی اللہ علیہ وسلم کے داخلی; سیاسی اقدامات"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "مراسلات; ۔ غیرملکیوں کےساتھ وفودکاتبادلہ"
      },
      {
        "week_number": 10,
        "topic": "۔ اقلیتوں کے حقوق کا سیرتی مطالعہ; ۔ اسلامی ریاست میں غیر مسلموں کے حقوق و فرائض"
      },
      {
        "week_number": 11,
        "topic": "نبی کریم ﷺ کی تعلیمی جدو جہد ۱۔ نشر علم کے لیے ایک جماعت کا قیام; ۔ خواتین کے لیے تعلیم کا اہتمام"
      },
      {
        "week_number": 12,
        "topic": "سیرۃالنبی صلی اللہ علیہ وسلم مولاناشبلی نعمانی،سیدسلمان ندوی 2; رحمۃاللعالمین قاضی محمدسلیمان سلمان منصورپوری 3"
      },
      {
        "week_number": 13,
        "topic": "نمبرشما; ر نام مؤلف نام کتاب"
      },
      {
        "week_number": 14,
        "topic": "Semester 6; Courses Course Codes Credit Hours Course Category"
      },
      {
        "week_number": 15,
        "topic": "Management; BUSA3121 3(3+0) Disciplinary"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA3122": {
    "code": "BUSA3122",
    "title": "Financial Management",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Overview of the Course Introduction of Financial Management, Goals of a Financial Manager, Goals of the Firm."
      },
      {
        "week_number": 2,
        "topic": "Time Value of Money Concept of Time Value of Money, Time Line and its importance, Compounding and Discounting Types of Annuities: Ordinary Annuities and Annuity Due"
      },
      {
        "week_number": 3,
        "topic": "Types of Loan, Amortization Types of Loan, Amortization of Loan and Schedule"
      },
      {
        "week_number": 4,
        "topic": "Valuation of Long-Term Securities Bonds, Types of Bonds, Yield to Maturity and Yield to call, Required rate of return,"
      },
      {
        "week_number": 5,
        "topic": "Valuation of Stocks Types of Stocks, Valuation of Present Value of Stock, Special Cases of Common Stock, Gordon Growth Model, Non-Growth Model"
      },
      {
        "week_number": 6,
        "topic": "Risk and Return Single Asset-Variance, Standard Deviation and Coefficient of Variation, Portfolio Risk and Return- Variance, Standard Deviation and Coefficient of Variation, Covariance and Correlation Coefficient"
      },
      {
        "week_number": 7,
        "topic": "Risk and Return Difference between total risk, Systematic and Unsystematic risk The Capital-Asset Pricing Model (CAPM)"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Capital Budgeting The relevant cash flows, Major cash flow components, Expansion Vs replacement cash flows, Sunk and Opportunity costs"
      },
      {
        "week_number": 10,
        "topic": "Finding the initial investment, Operating cash inflows and terminal cash flow"
      },
      {
        "week_number": 11,
        "topic": "Types of Projects- Independent versus Mutually Exclusive Capital Budgeting Techniques: Payback & Discounted Payback Period,"
      },
      {
        "week_number": 12,
        "topic": "Net Present Value (NPV) and NPV Profile, Internal Rate of Return (IRR Advance Cases of NPV and IRR, Manual and through Microsoft Excel"
      },
      {
        "week_number": 13,
        "topic": "MIRR and Profitability Index Modified Internal Rate of Return (MIRR), Profitability Index Mutually Exclusive Projects: Difference of Scale, Difference of Pattern, Difference of Life, Risk in Capital Budgeting and Capital Rationing"
      },
      {
        "week_number": 14,
        "topic": "Theories of Capital Structure Theories of Capital Structure and Dividend policy- Modigliani and Miller Theory, Pecking Order Theory, Tax Shield Theory, Market Timing Theory"
      },
      {
        "week_number": 15,
        "topic": "Theories of Dividend Policy Theories of Dividend Policy- Bird-in-hand Theory, Clientele Theory and Signaling Theory"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA3115": {
    "code": "BUSA3115",
    "title": "Business Research Methods",
    "credit_hours": "03 (3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Week Contents; Introduction of business research,"
      },
      {
        "week_number": 2,
        "topic": "basics Role of Business Research: Basic research and applied; research, managerial importance of research"
      },
      {
        "week_number": 3,
        "topic": "generalizability, parsimony.; Business Research Process: overview, challenges and options"
      },
      {
        "week_number": 4,
        "topic": "selecting research topic; Conducting a relevant and comprehensive Literature review"
      },
      {
        "week_number": 5,
        "topic": "From theory to measurement: Theory, concepts, constructs; and variables, abstract and empirical levels of measurement"
      },
      {
        "week_number": 6,
        "topic": "variables types of variables, Independent, dependent,; moderator, mediator"
      },
      {
        "week_number": 7,
        "topic": "Correlational, Causal etc; Survey research: setting the design"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Follow APA style of research paper; Goodness of measurement: Reliability, validity"
      },
      {
        "week_number": 10,
        "topic": "scales. Nominal, Ordinal, Interval, Ratio.; Questionnaire design: Types of questions. Do’s and Don’ts of"
      },
      {
        "week_number": 11,
        "topic": "sampling, Sample size, non-probability sampling and its types,; probability sampling and its types"
      },
      {
        "week_number": 12,
        "topic": "Data Analysis: Introduction to SPSS and SEM Software,; univariate and bivariate analysis, Descriptives, regression"
      },
      {
        "week_number": 13,
        "topic": "approach); Presentation of the research project"
      },
      {
        "week_number": 14,
        "topic": "Recommended Study (Latest editions):; Business Research Methods by W. G. Zikmund"
      },
      {
        "week_number": 15,
        "topic": "Business Research Methods by Bryman and Bell; Any other text/handouts as suggested by the instructor"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA3119": {
    "code": "BUSA3119",
    "title": "Organizational Behavior",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Week Contents; Introduction: defining organizational behavior, management and"
      },
      {
        "week_number": 2,
        "topic": "organizational behavior, important contributors to organizational; behavior, developing OB model."
      },
      {
        "week_number": 3,
        "topic": "Diversity in Organizations: diversity and its levels.; Discrimination. Biographical characteristics and other"
      },
      {
        "week_number": 4,
        "topic": "management strategies. Intellectual and physical abilities.; Attitudes and Job Satisfaction: job related attitudes, job"
      },
      {
        "week_number": 5,
        "topic": "satisfaction and ways to measure it. What causes job; satisfaction? Outcomes of job satisfaction and impact of job"
      },
      {
        "week_number": 6,
        "topic": "Emotions and Moods: what are emotions and moods? Types of; basic emotions, sources of emotions and moods, OB applications"
      },
      {
        "week_number": 7,
        "topic": "of emotions and moods.; Personality and Values: personality, personality frameworks."
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Values and its importance, cultural values.; Mid Term Exams"
      },
      {
        "week_number": 10,
        "topic": "Perception: perception and its influencing factors, attribution; theory, link between perception and decision making."
      },
      {
        "week_number": 11,
        "topic": "Motivation Concepts: defining motivation. Its early and; contemporary theories."
      },
      {
        "week_number": 12,
        "topic": "Foundations of group behavior Work teams: Stages of group; development, group properties, group decision making,"
      },
      {
        "week_number": 13,
        "topic": "difference between groups and work teams. Types of teams.; Turning individuals into team players."
      },
      {
        "week_number": 14,
        "topic": "leadership, sources of power, Politics: power in action, causes; and consequences of political behavior"
      },
      {
        "week_number": 15,
        "topic": "Organizational Culture: What is culture? What do cultures do?; Creating and sustaining culture"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA3121": {
    "code": "BUSA3121",
    "title": "Operations and supply chain management",
    "credit_hours": "3",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introductory class, Introduction Basic Concepts of Production and Operations Management. Organizations for creation of goods and service"
      },
      {
        "week_number": 2,
        "topic": "Operations and Productivity, Organizing to Produce Goods and Services, The Supply Chain, The History of Operations Management, Operations for Goods and Services."
      },
      {
        "week_number": 3,
        "topic": "The Productivity Challenge, Productivity Measurement, Productivity Variables, Productivity and the Service Sector, Current Challenges in Operations Management Ethics, Social Responsibility"
      },
      {
        "week_number": 4,
        "topic": "Operations Strategy in a Global Environment, A Global View of Operations and Supply Chains, Cultural and Ethical Issues, Developing Missions and Strategies, Mission, Strategy, Achieving Competitive Advantage Through Operations, Competing on Differentiation, Competing on Cost, Competing on Response, Issues in Operations Strategy, Strategy"
      },
      {
        "week_number": 5,
        "topic": "Forecasting, Forecasting Time Horizons, Types of Forecasts, The Strategic Importance of Forecasting, Supply-Chain Management, Human Resources, Capacity, Seven Steps in the Forecasting System, Forecasting Approaches, Overview of Qualitative Method,"
      },
      {
        "week_number": 6,
        "topic": "Overview of Quantitative Methods, Time-Series Forecasting, Decomposition of a Time Series, Naive Approach, Moving Averages, Exponential Smoothing, Measuring Forecast Error, Exponential Smoothing with Trend, Adjustment"
      },
      {
        "week_number": 7,
        "topic": "Process Strategy, Four Process Strategies, Process Focus, Repetitive Focus, Product Focus, Mass Customization Focus, Process Comparison, Selection of Equipment, Process Analysis and Design, Flowchart, Time-Function Mapping, Process Charts, Value-Stream Mapping, Service Blueprinting"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Project Management, Project Planning, The Project Manager, Work Breakdown Structure, Project Scheduling, Project Controlling, Project Management Techniques: PERT and CPM, The Framework of PERT and CPM, Network Diagrams and Approaches,"
      },
      {
        "week_number": 10,
        "topic": "Activity-on-Node Example, Activity-on-Arrow Example, Determining the Project Schedule, Forward Pass, Backward Pass, Calculating Slack Time and Identifying the Critical Path(s), Variability in Activity Times, Three Time Estimates in"
      },
      {
        "week_number": 11,
        "topic": "Syllabus Content & Practical Applications for Week 11"
      },
      {
        "week_number": 12,
        "topic": "Syllabus Content & Practical Applications for Week 12"
      },
      {
        "week_number": 13,
        "topic": "Syllabus Content & Practical Applications for Week 13"
      },
      {
        "week_number": 14,
        "topic": "Syllabus Content & Practical Applications for Week 14"
      },
      {
        "week_number": 15,
        "topic": "Syllabus Content & Practical Applications for Week 15"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA3118": {
    "code": "BUSA3118",
    "title": "Marketing Management",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Understanding the marketing management basic concepts: value of marketing, the scope; of marketing. Core marketing concepts: needs, wants and demands, offerings, marketing"
      },
      {
        "week_number": 2,
        "topic": "channels, paid, owned and earned media, value and satisfaction. Updating 4Ps of marketing; and understanding the 4As of marketing."
      },
      {
        "week_number": 3,
        "topic": "Developing marketing strategies: The value delivery process, value chain, core; competencies. Corporate and division strategic planning: defining corporate mission,"
      },
      {
        "week_number": 4,
        "topic": "establishing strategic business unit, assigning resources to each SBU, assessing growth; opportunities. Business unit strategic planning: business mission, swot analysis, goals"
      },
      {
        "week_number": 5,
        "topic": "Creating long loyalty and relationships: Building customer value, satisfaction, CPV, total; customer satisfaction, monitoring satisfaction. Importance of customer, Loyalty, Definition"
      },
      {
        "week_number": 6,
        "topic": "of customer lifetime value and its measurements.; Analyzing Marketing Opportunities: MIS (Management Information System), role of MIS"
      },
      {
        "week_number": 7,
        "topic": "in marketing management, ways of gathering information, internal records system,; marketing intelligence activities, marketing research, marketing decision support analysis."
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "business markets, buying center, participants in business buying center. Business buying; process"
      },
      {
        "week_number": 10,
        "topic": "Competitive strategies: growth, growth strategies. Competitive strategies for market; leaders, other competitive strategies. Product life cycle marketing strategies, product life"
      },
      {
        "week_number": 11,
        "topic": "cycles, style, fashion, and fad life cycles.; Developing brand positioning: developing a brand positioning, understanding value and"
      },
      {
        "week_number": 12,
        "topic": "prepositions, choosing a competitive frame of reference, point of parity, point of difference,; brand mantras. Constructing a brand positioning Bull’s eye."
      },
      {
        "week_number": 13,
        "topic": "Differentiation: products and services differentiations. Product and brand relationships: the; product hierarchy, product systems and mixes, product line analysis and product line length."
      },
      {
        "week_number": 14,
        "topic": "Co-branding and ingredient branding.; Conducting marketing research: the scope of marketing research, importance of marketing"
      },
      {
        "week_number": 15,
        "topic": "research. The marketing research process: steps of marketing research.; Analyzing consumer markets: the factors that affect consumer behavior, cultural factors,"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4114": {
    "code": "BUSA4114",
    "title": "International Business and Trade",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Globalization: Definition of globalization, its Nature and Scope. The emergence of global"
      },
      {
        "week_number": 2,
        "topic": "institutions, forces behind globalization and its impact on national and international business; environment"
      },
      {
        "week_number": 3,
        "topic": "International trade theory: The pattern of international trade, Absolute and comparative; advantage, Free trade and globalization, The product life cycle, New trade theory, National"
      },
      {
        "week_number": 4,
        "topic": "comparative advantage and Porter’s Diamond"
      },
      {
        "week_number": 5,
        "topic": "Difference in culture: Cultural, Social structure and religious system. Impact of these; cultural differences in workplace settings"
      },
      {
        "week_number": 6,
        "topic": "National difference in political economy: International Political, economic, Legal systems; and their respective features"
      },
      {
        "week_number": 7,
        "topic": "The political economy of international trade: Instruments of trade, Government; Intervention, Development of the world trade system, WTO"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Foreign direct investment (FDI): Foreign direct investment in the world economy, Foreign"
      },
      {
        "week_number": 10,
        "topic": "direct investment in china, Horizontal foreign direct investment, Vertical foreign direct; investment, The cost of FDI to home and host country"
      },
      {
        "week_number": 11,
        "topic": "The international monetary system: The gold standard, The Bretton Woods system, Fixed; exchange rates and floating exchange rates, Role of IMF"
      },
      {
        "week_number": 12,
        "topic": "The strategy of international business: Strategy and firm, Global expansion, profitability; and profit growth, Location economics, Cost pressure and pressure for local responsiveness,"
      },
      {
        "week_number": 13,
        "topic": "Choosing a strategy; Entry strategy in international business and strategic Alliance: Basic entry decisions, Entry"
      },
      {
        "week_number": 14,
        "topic": "modes, Strategic alliance; Global production, outsourcing and logistics: Strategies of production and logistics,"
      },
      {
        "week_number": 15,
        "topic": "Where to produce, The strategic role of foreign factories, Outsourcing production(Make or; Buy decision), Managing a global supply"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "ITEC4120": {
    "code": "ITEC4120",
    "title": "Electornic Commerce",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Electronic Commerce; Discuss the e-commerce process."
      },
      {
        "week_number": 2,
        "topic": "Identify the major electronic payment issues and options; Course Outlines"
      },
      {
        "week_number": 3,
        "topic": "chains, Evaluate SWOT techniques; Technology Infrastructure: Internet, World Wide Web, Networks, ISPs, Markup"
      },
      {
        "week_number": 4,
        "topic": "Marketing on The Web: Identify the major marketing strategies used in e-commerce,; Discuss marketing issues related to e-commerce, Examine the differences between"
      },
      {
        "week_number": 5,
        "topic": "differentiating market segments, Examine customer relationship life cycle as it relates to; e-commerce, Compare advertising methods used in traditional commerce and e-commerce,"
      },
      {
        "week_number": 6,
        "topic": "Examine strategies used by businesses use to improve purchasing, logistics, and other; support activities, Discuss electronic data interchange, Compare electronic data interchange"
      },
      {
        "week_number": 7,
        "topic": "management systems, Examine the effective use of electronic portals and marketplaces; Online Auctions, Virtual Communities, and Web Portals: Define auctions, Web portals"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "auctions, Discuss the significance of virtual; communities"
      },
      {
        "week_number": 10,
        "topic": "intellectual property by online businesses, Discuss online crime, terrorism, and warfare,; Discuss ethics issues that arise for companies conducting electronic commerce, Examine"
      },
      {
        "week_number": 11,
        "topic": "on electronic commerce activities, Discuss the increasing pressure by States to regulate and; issue taxes based one-commerce"
      },
      {
        "week_number": 12,
        "topic": "spam and methods for controlling spam, Discuss internet and web site software packages; Electronic Commerce Software: Web-hosting services, Electronic commerce software."
      },
      {
        "week_number": 13,
        "topic": "techniques used for securing communication channels between computers, Examine; security techniques for securing server computers, Evaluate organizations that promote"
      },
      {
        "week_number": 14,
        "topic": "Contrast the different e-payment options, Identify on-line payment services, Explain; activities performed by a transaction-processing service."
      },
      {
        "week_number": 15,
        "topic": "electronic signatures; Recommended Books:"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "ECON4130": {
    "code": "ECON4130",
    "title": "Financial Markets",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Theory of the Role and Functioning of Financial System: Information asymmetric and the; need for the role of financial sector. Some Basic concepts like adverse selection, moral hazard,"
      },
      {
        "week_number": 2,
        "topic": "free rider and principal-agent problems in financial sector to understand puzzles of financial; markets. Financial system and its relationship with the rest of the economy, Functions of"
      },
      {
        "week_number": 3,
        "topic": "financial sector: mobilization and allocation of resources; pooling, diversification and trading; of risk; advisory role; financing technological innovation and development, Financial"
      },
      {
        "week_number": 4,
        "topic": "Repression vs Financial Liberalization. Growth and stability of financial system.; Why there is need to regulate the financial sector? Why financial sector is most regulated one"
      },
      {
        "week_number": 5,
        "topic": "promotion, establishment, regulation and supervision of depository institutions; exchange; rate policy and management of foreign exchange reserves, Payment System (NIFT and its"
      },
      {
        "week_number": 6,
        "topic": "functions. Relating to payments system). Securities and Exchange Commission of Pakistan; and its functions: promotion, establishment, regulation and supervision of various components"
      },
      {
        "week_number": 7,
        "topic": "of capital market.; Financial Institutions and Current issues:"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "commercial banking; structure of commercial bank in Pakistan; Assets and Liabilities of a; commercial bank performance indicators for commercial banks; recent issues in commercial"
      },
      {
        "week_number": 10,
        "topic": "banking.; Non-bank Financial Institutions: Development Financial Institutions, Investment Banks,"
      },
      {
        "week_number": 11,
        "topic": "Modarabas, Leasing companies Mutual Funds, Housing Finance Corporations, Discount; Houses, Venture Capital Companies."
      },
      {
        "week_number": 12,
        "topic": "Insurance Companies - the rationale and role.; Financial Markets and Current Issues:"
      },
      {
        "week_number": 13,
        "topic": "Functioning of Money Market (Primary and Secondary Dealers; Capital Market (Stock exchanges and Various Components of capital markets-Securities,"
      },
      {
        "week_number": 14,
        "topic": "Foreign Exchange Market and its evolution, dollarization of the economy. Financial; Infrastructure Legal Framework (SBP Act 1956, BCO, 1984, SBP Prudential Regulations)"
      },
      {
        "week_number": 15,
        "topic": "Accounting Standard, Auditing, Corporate governance of banks and other financial; institutions. Human Resource Development (Skill and Training) - Importance for"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4147": {
    "code": "BUSA4147",
    "title": "Data Analytics for Business",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Week Content; Introduction to Data Analytics"
      },
      {
        "week_number": 2,
        "topic": "Overview of data analytics tools and technologies; Data Types and Sources"
      },
      {
        "week_number": 3,
        "topic": "Data Analysis Basics; Introduction to descriptive, diagnostic, predictive, and"
      },
      {
        "week_number": 4,
        "topic": "Excel Fundamentals for Data Analytics; Introduction to Microsoft Excel for data analysis"
      },
      {
        "week_number": 5,
        "topic": "Data Cleaning and Preprocessing in Excel; Identifying and handling missing data"
      },
      {
        "week_number": 6,
        "topic": "Installing the add on; Creating a data model using power pivot function"
      },
      {
        "week_number": 7,
        "topic": "and more; Identifying patterns, trends, and outliers in data"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Mid Term; Introduction to Business Intelligence (BI)"
      },
      {
        "week_number": 10,
        "topic": "should practically demonstrate a relevant tool to the students; Introduction to Predictive Analytics"
      },
      {
        "week_number": 11,
        "topic": "Introduction to supervised and unsupervised learning.; Over view of tools and platforms for data mining"
      },
      {
        "week_number": 12,
        "topic": "Overview of decision trees; Data Analytics for Business Applications"
      },
      {
        "week_number": 13,
        "topic": "Introduction to Big Data and Data Science; Basics of big data and its implications for business"
      },
      {
        "week_number": 14,
        "topic": "Introduction to Artificial intelligence and its implications; for data science"
      },
      {
        "week_number": 15,
        "topic": "Data Analytics Made Accessible by Dr. Anil Maheshwari; Data Analytics with Excel by Prabhu, Punit"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4148": {
    "code": "BUSA4148",
    "title": "Business Capstone Project",
    "credit_hours": "3 (0+3)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Week Content; Introduction to the Business Project"
      },
      {
        "week_number": 2,
        "topic": "business domains; Opportunity Identification and Market Research"
      },
      {
        "week_number": 3,
        "topic": "Analyzing target customers and their needs; Discuss type of business e.g. manufacturing, services, high tech,"
      },
      {
        "week_number": 4,
        "topic": "Is the business idea feasible?; Is the business idea sustainable?"
      },
      {
        "week_number": 5,
        "topic": "students during week 3 and 4; Business Plan Document outline"
      },
      {
        "week_number": 6,
        "topic": "Defining the product or services offering; Discuss sample business plans"
      },
      {
        "week_number": 7,
        "topic": "Analyzing competitive positioning and differentiation; Mid term (presentation of business ideas/innovative products)"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Exploring various funding options; Legal and Regulatory Considerations"
      },
      {
        "week_number": 10,
        "topic": "Implementation and Operational Plan; Outlining the operational processes and management structure"
      },
      {
        "week_number": 11,
        "topic": "Document preparation and Pitch practice; Creating a formatted and well-presented document in a word processor"
      },
      {
        "week_number": 12,
        "topic": "Submission of document and Business plan presentations; Business Plan Presentations"
      },
      {
        "week_number": 13,
        "topic": "Business Plan document = 60% (Final Term); Note* Instructors can use any suitable template for a business plan document."
      },
      {
        "week_number": 14,
        "topic": "shortage or surplus, location [online, physical or hybrid] etc.; Management plan (legal status, Organizational hierarchy, entrepreneurs’ position, HR policies, job"
      },
      {
        "week_number": 15,
        "topic": "Financial Plan (required, 3-5-year forecasting, sources of funding, projected statements); Assessment of risk (SWOT, PEST, key success factors)"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA5113": {
    "code": "BUSA5113",
    "title": "Strategic Management",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Week Content; Strategic management process: Environmental scanning,"
      },
      {
        "week_number": 2,
        "topic": "of goals, types of plans, scope of planning, scope of decision; making, levels of organization, and levels of strategy. Strategic"
      },
      {
        "week_number": 3,
        "topic": "school, the positioning school, the entrepreneurial school, the; cognitive schools, the learning school, the power school, the cultural"
      },
      {
        "week_number": 4,
        "topic": "become, importance of vision and mission, characteristics of mission; statement, writing and evaluating mission statement."
      },
      {
        "week_number": 5,
        "topic": "Scanning the external environment: Natural environment, societal; environment and GPEST forces, environmental change and"
      },
      {
        "week_number": 6,
        "topic": "entrants, substitutes, buyers, suppliers, and other stake holders. EFE; matrix and CPM"
      },
      {
        "week_number": 7,
        "topic": "based view of CA, VRIO framework and strategic resources,; sustainable competitive advantage, value chain and customer value,"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "SWOT analysis: SWOT matrix, TOWS matrix, IE matrix and; directional strategies, SPACE matrix Corporate strategies: Growth"
      },
      {
        "week_number": 10,
        "topic": "business screen. Corporate parenting strategy.; Business strategies: Competitive strategies: low cost strategy,"
      },
      {
        "week_number": 11,
        "topic": "Functional strategies: Marketing strategy, financial strategy, R&D strategy,; operations strategy, HR strategy."
      },
      {
        "week_number": 12,
        "topic": "Strategy evaluation and control: Performance measurement, strategic; audit of a corporation. Control mechanism."
      },
      {
        "week_number": 13,
        "topic": "Concepts in Strategic Management and Business Policy by Thomas Wheelen; Strategic Management Concepts and Cases by Fried. R. David"
      },
      {
        "week_number": 14,
        "topic": "Handouts/other texts as suggested by the course instructor; Finance Specialization Courses"
      },
      {
        "week_number": 15,
        "topic": "Investments and Portfolio Management BUSA4119 3 (3+0); Financial Risk and Insurance Management BUSA4120 3 (3+0)"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA5134": {
    "code": "BUSA5134",
    "title": "Financial Statement Analysis",
    "credit_hours": "3",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Financial Statement Analysis; Course Hours: 3(3+0)"
      },
      {
        "week_number": 2,
        "topic": "performance of an organization both financial and non-; financial which will help them in measuring the financial"
      },
      {
        "week_number": 3,
        "topic": "conditions of the organizations.; CO2 To understand financial standing of a company according to"
      },
      {
        "week_number": 4,
        "topic": "Course Learning Outcomes:; After the completion of the course, students will be able to;"
      },
      {
        "week_number": 5,
        "topic": "CLO3 Use the cash flow statement to examine a firm`s liquidity position; and determine the firm`s operating cash flows."
      },
      {
        "week_number": 6,
        "topic": "Course Outlines:; Overview of Financial Reporting"
      },
      {
        "week_number": 7,
        "topic": "Financial Statements; Elements of balance sheet"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Basics of Analysis; Ratio analysis"
      },
      {
        "week_number": 10,
        "topic": "Other source of liability; Liquidity Ratios"
      },
      {
        "week_number": 11,
        "topic": "Cash Ratio; Profitability Ratios"
      },
      {
        "week_number": 12,
        "topic": "Investors Ratios; Leverage and its effects"
      },
      {
        "week_number": 13,
        "topic": "Dividend payout ratio; DuPont Model"
      },
      {
        "week_number": 14,
        "topic": "Financial ratios and the statement of cash flow; Alternative cash flow"
      },
      {
        "week_number": 15,
        "topic": "Financial Statement Analysis by K.R. Subramanyam 11th Edition; Financial Reporting Analysis by Charles H. Gibson (Latest Edition)"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4119": {
    "code": "BUSA4119",
    "title": "Investments and Portfolio Management",
    "credit_hours": "03 (3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Understanding Investments: The Nature of Investments, Understanding the Investment"
      },
      {
        "week_number": 2,
        "topic": "Decision Process"
      },
      {
        "week_number": 3,
        "topic": "Investment Alternatives: Organizing Financial Assets, Money Market Securities, Fixed-; Income Securities, Equity Securities"
      },
      {
        "week_number": 4,
        "topic": "Indirect Investing: Investment Company, Types of Investment Companies, Major Types of"
      },
      {
        "week_number": 5,
        "topic": "Mutual Funds, Net Asset Value, Mutual Fund Returns; How Securities are Traded: Brokerage Transactions, How Orders Work, Margin, Short"
      },
      {
        "week_number": 6,
        "topic": "The Returns and Risks from Investing: Return, Measuring Returns, Taking a Global"
      },
      {
        "week_number": 7,
        "topic": "Perspective, Measuring Risk, Realized Returns and Risks from Investing; Portfolio Theory: Dealing with Uncertainty, Portfolio Return and Risk, Analyzing Portfolio"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Risk, Modern Portfolio Theory, Measuring Co-movements in Security Returns, Calculating"
      },
      {
        "week_number": 10,
        "topic": "Portfolio Risk, Efficient Portfolios"
      },
      {
        "week_number": 11,
        "topic": "Portfolio Selection: Building Portfolio using Markowitz principles, Indifference curves,; Alternative methods of obtaining the efficient frontier, Optimal Assets classes,"
      },
      {
        "week_number": 12,
        "topic": "Diversification on risk"
      },
      {
        "week_number": 13,
        "topic": "Asset Pricing Models: Capital Market Theory, Equilibrium Return-Risk Trade-off,; Estimating SML"
      },
      {
        "week_number": 14,
        "topic": "Economy/ Market Analysis Sector/ Industry Analysis, Technical Analysis: Assessing the"
      },
      {
        "week_number": 15,
        "topic": "Economy, Analyzing Sector/ Industry, Stock Price and Volume Technique, Technical; Indicators"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4118": {
    "code": "BUSA4118",
    "title": "International Finance",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Overview of Multinational Financial Management: Goals Of Multinational corporations"
      },
      {
        "week_number": 2,
        "topic": "(MNC); Theories of international finance; International business methods and opportunities;"
      },
      {
        "week_number": 3,
        "topic": "Valuation model for an MNC"
      },
      {
        "week_number": 4,
        "topic": "International Flow of Funds: Balance of payments; Factors Affecting international trade"
      },
      {
        "week_number": 5,
        "topic": "flows; Correction of Trade deficit; International capital flow; International Agencies affect"
      },
      {
        "week_number": 6,
        "topic": "international trade on MNC"
      },
      {
        "week_number": 7,
        "topic": "International Financial Markets: Foreign exchange markets; Overview of International; financial markets; International Money Market; International Credit Market; International"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Bond Market; International Stock Market"
      },
      {
        "week_number": 10,
        "topic": "Exchange Rate Determinations: Exchange rate movements and equilibrium; Factor"
      },
      {
        "week_number": 11,
        "topic": "affecting exchange rates"
      },
      {
        "week_number": 12,
        "topic": "Exchange Rate Behaviors: Exchange rate systems; Government interventions; International Arbitrage and Interest Rates: International arbitrage; Locational arbitrage;"
      },
      {
        "week_number": 13,
        "topic": "Triangular arbitrage; Covered interest arbitrage; Comparison of Arbitrage; Interest rate"
      },
      {
        "week_number": 14,
        "topic": "parity(IRP)"
      },
      {
        "week_number": 15,
        "topic": "Relationship among Inflation, Interest Rates and Exchange Rates: Purchase power; parity(PPP); International Fisher Effect(IFE)"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4120": {
    "code": "BUSA4120",
    "title": "Financial Risk and Insurance Management",
    "credit_hours": "03 (3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Risk and Its Treatment: Definitions of Risk, Chance of Loss, Peril and Hazard"
      },
      {
        "week_number": 2,
        "topic": "Classification of Risk, Major Personal Risks and Commercial Risk, Burden of Risk on"
      },
      {
        "week_number": 3,
        "topic": "Society, Techniques for Managing Risk; Insurance and Risk: Definition of Insurance, Basic Characteristics of Insurance,"
      },
      {
        "week_number": 4,
        "topic": "Characteristics of an Ideally Insurable Risk, Two Applications: The Risks of Fire and"
      },
      {
        "week_number": 5,
        "topic": "Unemployment, Adverse Selection and Insurance, Insurance and Gambling Compared,; Insurance and Hedging Compared, Types of Insurance, Benefits of Insurance to Society,"
      },
      {
        "week_number": 6,
        "topic": "Cost of Insurance to Society"
      },
      {
        "week_number": 7,
        "topic": "Introduction to Risk Management: Meaning of Risk Management, Objectives of Risk; Management, Steps in the Risk Management Process, Implement and Monitor the Risk"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Management Program, Benefits of Risk Management, Personal Risk Management"
      },
      {
        "week_number": 10,
        "topic": "Advanced Topics In Risk Management: The Changing Scope of Risk Management,"
      },
      {
        "week_number": 11,
        "topic": "Insurance Market Dynamics, Loss Forecasting, Financial Analysis in Risk Management; Decision Making, Other Risk Management Tools"
      },
      {
        "week_number": 12,
        "topic": "Types of Insurers and Marketing Systems: Overview of Private Insurance in the Financial"
      },
      {
        "week_number": 13,
        "topic": "Services Industry, Types of Private Insurers, Agents and Brokers, Types of Marketing; Systems, Group Insurance Marketing"
      },
      {
        "week_number": 14,
        "topic": "Insurance Company Operations: Insurance Company Operations, Rating and Ratemaking,"
      },
      {
        "week_number": 15,
        "topic": "Underwriting, Production, Claims Settlement, Reinsurance, Alternatives to Traditional; Reinsurance, Investments, Other Insurance Company Functions"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4121": {
    "code": "BUSA4121",
    "title": "Islamic Finance",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "An Overview of Islamic Financial System: Evolution of Islamic Banking, Historical"
      },
      {
        "week_number": 2,
        "topic": "development in the field of Islamic Finance in Pakistan; Distinguishing features of Islamic"
      },
      {
        "week_number": 3,
        "topic": "Finance"
      },
      {
        "week_number": 4,
        "topic": "Salient Features of Islamic Financial System: An overview of conventional financial"
      },
      {
        "week_number": 5,
        "topic": "system, Philosophical basis of Islamic Financial system, Main prohibitions in Islamic"
      },
      {
        "week_number": 6,
        "topic": "Financial System (Riba, Gharar, Qimar/Maisir), Business ethics in Islamic financial system,"
      },
      {
        "week_number": 7,
        "topic": "A thorough comparison of Capitalism and Islamic Economic System; Fundamentals of Islamic Finance: A brief understanding of Contractual bases in Islam,"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Distinction between Loan and Debt"
      },
      {
        "week_number": 10,
        "topic": "Major Islamic Modes: Participatory modes of financing (Musharikah, Mudarabah,"
      },
      {
        "week_number": 11,
        "topic": "Diminishing musharakah), Bai Financing (Musawama and Murabaha), Forward Sale"
      },
      {
        "week_number": 12,
        "topic": "Financing (Salam and Istasna), Ijarah and Takaful; Islamic Capital Markets and Instruments: Securitization, Sukuk and its types, Shariah"
      },
      {
        "week_number": 13,
        "topic": "compliance, Potential of sukuks in the development of Islamic fund management"
      },
      {
        "week_number": 14,
        "topic": "Performance of Islamic Financial Institutions: A review of facts and figures about"
      },
      {
        "week_number": 15,
        "topic": "contemporary developments and performance of Islamic Financial Institutions both globally; and locally."
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4149": {
    "code": "BUSA4149",
    "title": "Fundamentals of Corporate Finance",
    "credit_hours": "3",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Fundamentals of Corporate; Finance"
      },
      {
        "week_number": 2,
        "topic": "To analyze the various theories of capital structure and leverage and their implications for financial; decision-making."
      },
      {
        "week_number": 3,
        "topic": "Identify and explain the fundamental concepts and principles of corporate finance.; Apply financial planning models, such as the percentage of sales approach, to forecast future"
      },
      {
        "week_number": 4,
        "topic": "and shareholder expectations.; Evaluate the advantages and disadvantages of leasing as a financing option and make informed buy"
      },
      {
        "week_number": 5,
        "topic": "The Financial Manager; Financial Management Decisions"
      },
      {
        "week_number": 6,
        "topic": "The Agency Problem and Control of the Corporation; Financial Markets and the Corporation"
      },
      {
        "week_number": 7,
        "topic": "External Financing and Growth; Dividend Policy"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Types of Dividend Policies; Constant-Payout-Ratio Policy"
      },
      {
        "week_number": 10,
        "topic": "Stock Split; Reverse Stock Split"
      },
      {
        "week_number": 11,
        "topic": "Capital Irrelevance Theory; Pecking Order Theory"
      },
      {
        "week_number": 12,
        "topic": "Operating leverage; Measuring the Degree of Operating Leverage"
      },
      {
        "week_number": 13,
        "topic": "Measuring the Degree of Total Leverage; The Relationship of Operating, Financial and Total Leverage"
      },
      {
        "week_number": 14,
        "topic": "Buy vs. Lease Decision Making; Corporate Governance"
      },
      {
        "week_number": 15,
        "topic": "What is Corporate Social Responsibility?; Current Dynamics in Corporate Social Responsibility"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4150": {
    "code": "BUSA4150",
    "title": "Credit Operations and Risk Management",
    "credit_hours": "3",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Week Content; Introduction to Credits / Lending"
      },
      {
        "week_number": 2,
        "topic": "banking in economic development of a country, Importance; of Lending operations"
      },
      {
        "week_number": 3,
        "topic": "revolving credit lines,; Fund based:"
      },
      {
        "week_number": 4,
        "topic": "finance, Discounting, Term finance, Finance against packing; merchandise,"
      },
      {
        "week_number": 5,
        "topic": "Promotion of bank’s credit, Appropriate utilization of credit,; Capturing new customers, Bases for allocation of funds for"
      },
      {
        "week_number": 6,
        "topic": "mitigation, Canons of Lending, Credit Processing and; Verification of Credit Worthiness of Customers, Bases for"
      },
      {
        "week_number": 7,
        "topic": "vertical analysis, Ratios and respective interpretations,; Assessment of customer financial capacity"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Hypothecation; Mortgage"
      },
      {
        "week_number": 10,
        "topic": "Steps to be taken to formalize the hypothecation; arrangements and post hypothecation inspections"
      },
      {
        "week_number": 11,
        "topic": "post pledge inspections; Mortgage:"
      },
      {
        "week_number": 12,
        "topic": "Legal / registered mortgage, Equitable mortgage, Floating; charge, Fixed charge, Exclusive charge, Pari passu charge,"
      },
      {
        "week_number": 13,
        "topic": "guarantee, Financial guarantee from other banks; Documents, Collateral Securities---Scrutiny, Valuation,"
      },
      {
        "week_number": 14,
        "topic": "proposal approval process from approved committee i.e.; issuance of Disbursement Authorization Certificate (DAC)"
      },
      {
        "week_number": 15,
        "topic": "regulations, Frequently asked questions available at SBP; website"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4122": {
    "code": "BUSA4122",
    "title": "Branch Banking Operations",
    "credit_hours": "3",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction to Subject Total sphere of the subject, Importance of the subject, Introduction to Branch banking, Basic infrastructure of banking organization"
      },
      {
        "week_number": 2,
        "topic": "Introduction to Commercial Banking Functions of commercial banks, Structure of commercial banks, Managerial hierarchies in commercial banks"
      },
      {
        "week_number": 3,
        "topic": "Structure of Branch Banking: Introduction to staff positions within branches inter- relationship of staff members, Chain of command within branches"
      },
      {
        "week_number": 4,
        "topic": "Functions performed in Branches: Different departments within branches e.g. Operations, Clearing, Credits etc., Function of each department and their respective importance, Importance of departmentalization within Branches"
      },
      {
        "week_number": 5,
        "topic": "Management of Branches: Branch Manager, Operations Manager, Credits Manager, Responsibilities of each manager"
      },
      {
        "week_number": 6,
        "topic": "Practical Session with working Bankers (Preferable) / practical case studies by respective teacher: Discussion about branch structure, Discussion about practices being followed by branches, Sharing of practical experiences"
      },
      {
        "week_number": 7,
        "topic": "Services provided by Branches to its customers: Introduction to banker customer relationship, Need of banking for general public, various services provided to customers"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Services Provided by Branches to its Customers Deposits, Importance of deposits, Different kinds of Deposit and their characteristics, General terms and conditions of different types of deposits, Concept of deposit Mobilization and cost management"
      },
      {
        "week_number": 10,
        "topic": "Clearing / Collection of Cheques and/or other payments: What is clearing and collection, Need of the function of clearing and collection, Features of bank cheques and important checks and balances in clearing/collection, Different categories of bank cheques e.g. bearer checks, crossed checks etc., Mechanism of Payment for clearing / collection, Role of NIFT in clearing"
      },
      {
        "week_number": 11,
        "topic": "Miscellaneous / Agency Services: Bills Payment / collection, Safe Deposits, Remuneration of funds and its fundamentals, Advisory services, Underwriting, Legal guardian / Custodial services"
      },
      {
        "week_number": 12,
        "topic": "Practical Workshop with External Practicing Banker (Preferable): Discussion about services and their practicalities, Practical cases of clearing, deposit, lending etc., Ways to tackle different situations"
      },
      {
        "week_number": 13,
        "topic": "Lending: Lending and its importance, Different lending products available in Pakistan, Characteristics of each category of lending product, Introduction to Risk management"
      },
      {
        "week_number": 14,
        "topic": "Trade: Introduction and basic working of trade department including letter of credit and discounting of bills of exchange"
      },
      {
        "week_number": 15,
        "topic": "Prudential Regulations issued by SBP: Introduction, Preface, Summarized information about prudential regulations, Frequently asked questions available at SBP website"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4123": {
    "code": "BUSA4123",
    "title": "Banking Law and Practice",
    "credit_hours": "3",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction of the Subject Sphere of the subject, Importance of understanding banking laws and practices"
      },
      {
        "week_number": 2,
        "topic": "Business of Banking Companies Form of business in which banking companies may engage"
      },
      {
        "week_number": 3,
        "topic": "Banking Mohtasib: Functions, Importance and role of banking mohtasib"
      },
      {
        "week_number": 4,
        "topic": "Banker-Customer Relationship: Functions of banker, Qualifications of a customer, rights and duties of banker and customer"
      },
      {
        "week_number": 5,
        "topic": "Accounts of Customer General Category of Accounts (Time and Demand Deposit), Specific types of accounts (Single Account, Joint-Account, Minor Account, )"
      },
      {
        "week_number": 6,
        "topic": "Laws and Practices In Handling Accounts: Problems in individual account, Death of a customer, Survivorship account, Bankruptcy of account holder"
      },
      {
        "week_number": 7,
        "topic": "Accounts of Business Clients: Partnership account, Corporate accounts, Clubs and societies Accounts, Trust accounts, Administrator account, Local bodies accounts"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Banking Instruments: Pay order and Demand draft, Promissory note, Bills of exchange"
      },
      {
        "week_number": 10,
        "topic": "Banking Instruments: Cheques, Traveler’s cheques, Letters of credit,"
      },
      {
        "week_number": 11,
        "topic": "Negotiable Instruments Act, 1881: Promissory Note and its features, Bills of exchange and its features"
      },
      {
        "week_number": 12,
        "topic": "Negotiable Instruments Act, 1881: Cheques, Clearing of cheques, Types of cheques • Crossed/ Open • Valid/Invalid • Stale Cheques • Pre-dated and Post-dated Cheques"
      },
      {
        "week_number": 13,
        "topic": "Clearing of Crossed Cheques The requisites of a valid cheques, Parties to cheques, Types of crossing, Clearing of cheques, NIFT and its function"
      },
      {
        "week_number": 14,
        "topic": "Endorsements Definition, Classification of endorsement, Principles of endorsement, Forms of endorsements, Holder and holder in due course"
      },
      {
        "week_number": 15,
        "topic": "Prudential Regulations issued by SBP: Introduction, Preface, Summarized information about prudential regulations, Frequently asked questions available at SBP website"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4124": {
    "code": "BUSA4124",
    "title": "International Banking",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction to International Banking: Brief overview of the subject, Concept of"
      },
      {
        "week_number": 2,
        "topic": "International banking, Importance of international banking; International Banking Services: Funds transfer, Correspondent banking, Lending services,"
      },
      {
        "week_number": 3,
        "topic": "Investments, Trade financing; International Fund Transfer Services: Introduction, System of fund transfer, Third party"
      },
      {
        "week_number": 4,
        "topic": "services like Money Gram etc., The concept of illegal fund transfers like Hawala, Hundi etc.,; Concept of Money Laundering"
      },
      {
        "week_number": 5,
        "topic": "Correspondent Banking Services: Introduction, Need for correspondence banking,; Different account types e.g. Nostro, Vostro etc., Lending services, Introduction, Domestic"
      },
      {
        "week_number": 6,
        "topic": "vs. International lending, Syndicated loans; Investments in International Banking: Need of Investment Opportunities for Banks, The"
      },
      {
        "week_number": 7,
        "topic": "concept of portfolio management, International investment avenues, Precautions for; international investments"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "International Banking Regulatory Framework: Introduction of Bank of International; Settlements (BIS), Introduction to different regulatory publications by BIS"
      },
      {
        "week_number": 10,
        "topic": "International Trade: Introduction, Need of international trade, Role of banking in; international trade"
      },
      {
        "week_number": 11,
        "topic": "International Payment Settlement Mechanisms: Open account, Advance payment,; Documentary collections, Documentary credits"
      },
      {
        "week_number": 12,
        "topic": "Documentary Credits (Letter of Credit): Mechanism of L/C, Different parties involved,; settlement of documentary Credits"
      },
      {
        "week_number": 13,
        "topic": "Documents Involved in L/C transaction: Commercial documents, Title documents,; Financial documents, Insurance documents, Official Documents"
      },
      {
        "week_number": 14,
        "topic": "Basic Rules applied to Documentary Credits: Introduction to UCP-600, Brief discussion of; Articles Risks Management in International Banking: Introduction, Country risk, Default"
      },
      {
        "week_number": 15,
        "topic": "risk, Transfer risk Risks Management in International Banking: Exchange Rate Risk,; Political Risk, Market Risk"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4151": {
    "code": "BUSA4151",
    "title": "Prudential Regulations for Corporate/ Commercial",
    "credit_hours": "3",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction of the Subject Sphere of the subject, Importance of understanding course, Definitions (mentioned in PRs)"
      },
      {
        "week_number": 2,
        "topic": "Definitions Definitions mentioned in latest issued PRs for commercial/corporate banking by State Bank of Pakistan (SBP)"
      },
      {
        "week_number": 3,
        "topic": "Definitions Definitions mentioned in latest issued PRs for commercial/corporate banking by State Bank of Pakistan (SBP)"
      },
      {
        "week_number": 4,
        "topic": "Risk Management Rules of PR Regulations R-1, Regulation R-2, relevant annexures"
      },
      {
        "week_number": 5,
        "topic": "Risk Management Rules of PR Regulations R-1, Regulation R-2, relevant annexures"
      },
      {
        "week_number": 6,
        "topic": "Risk Management Rules of PR Regulations R-3, Regulation R-4, relevant annexures"
      },
      {
        "week_number": 7,
        "topic": "Risk Management Rules of PR Regulations R-3, Regulation R-4, relevant annexures"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Risk Management Rules of PR Regulations R-5, Regulation R-6, relevant annexures"
      },
      {
        "week_number": 10,
        "topic": "Risk Management Rules of PR Regulations R-5, Regulation R-6, relevant annexures"
      },
      {
        "week_number": 11,
        "topic": "Risk Management Rules of PR Regulations R-7, Regulation R-8, relevant annexures"
      },
      {
        "week_number": 12,
        "topic": "Risk Management Rules of PR Regulations R-7, Regulation R-8, relevant annexures"
      },
      {
        "week_number": 13,
        "topic": "Risk Management Rules of PR Regulations R-9, Regulation R-10, relevant annexures"
      },
      {
        "week_number": 14,
        "topic": "Operations Rules of PR Regulation O-1, Regulation O-2, relevant annexures"
      },
      {
        "week_number": 15,
        "topic": "Operations Rules of PR Regulation O-3, Regulation O-4, relevant annexures"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4125": {
    "code": "BUSA4125",
    "title": "Advanced Accounting",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Review of Basic accounting concepts and framework: International Accounting Standard"
      },
      {
        "week_number": 2,
        "topic": "Committee, Fair presentation and compliance with IFRS, Departure from IFRS, Going; concern, Prudence, Accrual Basis of Accounting, Materiality and Aggregation, Offsetting,"
      },
      {
        "week_number": 3,
        "topic": "Frequency of Reporting, Presentation of Financial Statements"
      },
      {
        "week_number": 4,
        "topic": "Accounting for Inventories (IAS – 2): Measurement of Inventories, Cost of Inventories,; Cost of inventories of Service Provider, Techniques for Measurement of Cost, Net"
      },
      {
        "week_number": 5,
        "topic": "Realizable Value, Disclosures"
      },
      {
        "week_number": 6,
        "topic": "Revenue Recognition (IAS – 18): Definitions, Measurement of Revenue, Identification of; Transaction, Sale of goods, Rendering of Services, Interest, Royalties and Dividends,"
      },
      {
        "week_number": 7,
        "topic": "Disclosures; Property, Plant and Equipment (IAS – 16): Definitions, Recognition, Measurement at"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Recognition"
      },
      {
        "week_number": 10,
        "topic": "Measurement after Recognition: Cost Model, Revaluation Model, Depreciation,; Impairment, Compensation for Impairment, De-recognition, Disclosures"
      },
      {
        "week_number": 11,
        "topic": "Cash flow statements (IAS -7): Benefits of Cash flows Information, Definitions, Cash and"
      },
      {
        "week_number": 12,
        "topic": "Cash Equivalent, Classification of Cash flows, Format of Cash flow Statement, Preparation; of Cash flow Statement, Non-Cash Transactions, Disclosures"
      },
      {
        "week_number": 13,
        "topic": "Events after the Balance Sheet Date (IAS - 10): Definitions, Recognition and"
      },
      {
        "week_number": 14,
        "topic": "Measurement, Adjusting events after the reporting period, Non-adjusting events after the; reporting period, Dividends, Disclosures"
      },
      {
        "week_number": 15,
        "topic": "Leases (IAS – 17): Definitions, Classification of leases, Lease in financial statements of; lessees, Lease in financial statements of lessors, Disclosure Requirements"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4127": {
    "code": "BUSA4127",
    "title": "Financial Reporting Analysis",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Overview of Financial Statement Analysis: Overview of Financial Statement Analysis,"
      },
      {
        "week_number": 2,
        "topic": "Activities of Corporation, Financing Activities, Investing Activities, Operating Activities,"
      },
      {
        "week_number": 3,
        "topic": "Accounting Equation and Financial Statements, Comparative Financial Statement Analysis,"
      },
      {
        "week_number": 4,
        "topic": "Common-size Financial Statement Analysis, Ratio Analysis, Credit Risk Analysis,"
      },
      {
        "week_number": 5,
        "topic": "Profitability Analysis, Valuation ( Intrinsic Value )"
      },
      {
        "week_number": 6,
        "topic": "Financial Reporting and Analysis: Monitoring and Enhancing Mechanisms, Auditors,"
      },
      {
        "week_number": 7,
        "topic": "Corporate Governance, Securities and Exchange Commission, Litigation, Historical Cost; Convention and Fair Value Accounting"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Analyzing Financing Activities: Debt-Financing, Short-Term Financing, Mechanics of"
      },
      {
        "week_number": 10,
        "topic": "Accounting for Long-term Debt, Debt-related Disclosures, Future Debt Retirement,"
      },
      {
        "week_number": 11,
        "topic": "Unutilized Credit Lines, Protections, Seniority, Security, Covenants"
      },
      {
        "week_number": 12,
        "topic": "Provision (IAS-37): Recognition of Provision, Measurement of Provision, Examples of"
      },
      {
        "week_number": 13,
        "topic": "Provision, Warranty, Land Contamination, Customer Refunds, Onerous Contracts, Shareholders’"
      },
      {
        "week_number": 14,
        "topic": "Equity, Reporting of Capital Stock, Classification of Capital Stock, Retained Earnings, Cash"
      },
      {
        "week_number": 15,
        "topic": "and Stock Dividends, Spin-offs and Split-offs; Analyzing Investing Activities: Introduction to Current Assets, Operating Cycle, Cash and"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4126": {
    "code": "BUSA4126",
    "title": "Auditing Theory and Practice",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction to Auditing: Definition of Audit, Types of Audit, Objectives of Auditing,"
      },
      {
        "week_number": 2,
        "topic": "Users of Audited Reports, Responsibility of Directors and Auditors regarding financial"
      },
      {
        "week_number": 3,
        "topic": "Statements, The Expectation Gap, Level of Assurance"
      },
      {
        "week_number": 4,
        "topic": "The legal and professional requirement for an auditor: Appointment of Auditors,; Qualification of Auditors, Remuneration of Auditors, Rights or Power of an Auditor, Duties"
      },
      {
        "week_number": 5,
        "topic": "of an Auditor, Legal Liability of Auditor, Dismissal of Auditor, Letter of Engagement,"
      },
      {
        "week_number": 6,
        "topic": "Professional Ethics"
      },
      {
        "week_number": 7,
        "topic": "Internal Control and Fraud & Error: Definitions, Risk Assessment Process, Control; Procedures, Detailed Internal Control Description, Management Letter, Risk of fraud and"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "error, Inherent Limitations of Audit, Detection, Correction and Prevention"
      },
      {
        "week_number": 10,
        "topic": "Audit Documentation & Testing: Working Papers & Audit File, Substantive Tests,"
      },
      {
        "week_number": 11,
        "topic": "Techniques of Audit Testing"
      },
      {
        "week_number": 12,
        "topic": "Analytical Procedures: Definitions, Types of Analytical Procedures, Purpose of Analytical; Procedures"
      },
      {
        "week_number": 13,
        "topic": "Asset and Liability Verification: Fixed Assets and Investments Verification, Current"
      },
      {
        "week_number": 14,
        "topic": "Assets Verification, Liability Verification"
      },
      {
        "week_number": 15,
        "topic": "Audit Evidence: Definitions, Types of Audit Evidence; The Auditors’ Report: Basic Elements of Auditors’ Report, Types of Auditors’ Report"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4128": {
    "code": "BUSA4128",
    "title": "Consumer Behavior",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Session Topics; Introduction"
      },
      {
        "week_number": 2,
        "topic": "& 3 Determining different roles of consumers; Consumer decision making process"
      },
      {
        "week_number": 3,
        "topic": "Factors effecting needs & wants of the customer; &8 Market Value & its Classification. Role of Values in"
      },
      {
        "week_number": 4,
        "topic": "&10 Consumer as an individual; Factors Influencing the consumer perception"
      },
      {
        "week_number": 5,
        "topic": "Consumers’ learning process; Consumers’ learning process"
      },
      {
        "week_number": 6,
        "topic": "Understanding consumers; Factors influencing consumer motivation"
      },
      {
        "week_number": 7,
        "topic": "Personality & Lifestyles; &21 Understanding consumer attitude"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Presentation; &25 Effect of Culture, and personal Worth on Customer"
      },
      {
        "week_number": 10,
        "topic": "Group influence; Influence of social class"
      },
      {
        "week_number": 11,
        "topic": "Relationship based buying; Presentation of Final Project"
      },
      {
        "week_number": 12,
        "topic": "Consumer Behavior & Managerial Decision Making by Frank R. Karades; Customer Behavior by Banwari Mittal, Bruce I. Newman & Jagdish N. Sheth"
      },
      {
        "week_number": 13,
        "topic": "Journals:; Harvard Business Review (HBR)"
      },
      {
        "week_number": 14,
        "topic": "Journal of Marketing Consumer behavior; ‘Strategy and Business’"
      },
      {
        "week_number": 15,
        "topic": "Pakistan and Gulf Economist (PAGE); Web sites:"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4129": {
    "code": "BUSA4129",
    "title": "International Marketing",
    "credit_hours": "3 (3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction of International Marketing Task Environmental adaption need, developing global awareness, stages of international marketing involvement, strategic orientation."
      },
      {
        "week_number": 2,
        "topic": "Foreign Trade Polices WTO agreements."
      },
      {
        "week_number": 3,
        "topic": "Cultural Dynamics Definition and origin of culture, elements of culture, cultural change."
      },
      {
        "week_number": 4,
        "topic": "Cultural Management Style and Business Systems Required Adaption, management style around the world, gender bias in international business."
      },
      {
        "week_number": 5,
        "topic": "Political Environment Sovereignty of nations, stability of government policies, Political risk for global business, assessing political vulnerability."
      },
      {
        "week_number": 6,
        "topic": "International Legal Environment International Disputes, Protection of Intellectuals."
      },
      {
        "week_number": 7,
        "topic": "Emerging Markets Marketing and economic development, NIC growth factors, marketing in developing countries, emerging markets."
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Multinational Market Regions and Market Groups Patterns of multinational cooperation, global markets and multinational market groups."
      },
      {
        "week_number": 10,
        "topic": "Global Marketing Management Planning for global markets, alternative market-entry strategies, organization for global competition"
      },
      {
        "week_number": 11,
        "topic": "Foreign Market Entry Strategies Raging Bull, Foreign direct investment (FDI), Exporting, Licensing, Management contract, Joint venture, Manufacturing, Assembly operations, Turnkey operation, Acquisition, Strategic alliances"
      },
      {
        "week_number": 12,
        "topic": "Consumer Behavior In The International Context Perspectives on consumer behavior, motivation, learning, personality, psychographics, perception, Attitude, social class, group, family, opinion leadership"
      },
      {
        "week_number": 13,
        "topic": "Marketing Research And Information System Nature of marketing research, marketing information sources, secondary research, primary research, sampling, Basic methods of data collection."
      },
      {
        "week_number": 14,
        "topic": "Product and Service for Consumers Products and culture, analyzing product components for adaption, marketing consumer services globally."
      },
      {
        "week_number": 15,
        "topic": "Export Procedure and Documents Export restrictions, import restrictions, terms of sale, export documents, packing and marketing, customs-privileged facilities."
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4130": {
    "code": "BUSA4130",
    "title": "Marketing Communication",
    "credit_hours": "3 (3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Understanding Marketing Communication Defining and Classification of Modern Advertising, Core Advertising concepts"
      },
      {
        "week_number": 2,
        "topic": "Understanding Marketing Communication (Continue) Role of advertising, Types of advertising"
      },
      {
        "week_number": 3,
        "topic": "ADVERTISING IN BUSINESS AND SOCIETY The evaluation of advertising, Social, ethical, and Regulatory aspects of advertising and marketing communications"
      },
      {
        "week_number": 4,
        "topic": "Cultural Management Style and Business Systems Required Adaption, management style around the world, gender bias in international business."
      },
      {
        "week_number": 5,
        "topic": "Marketing Communication Mix Advertising, advertising planning (international) and cultural barriers, advertising plan, basic component, The basic component, setting advertising objectives"
      },
      {
        "week_number": 6,
        "topic": "Marketing Communication Mix (Continue) Sales Promotion, sales promotion defined, consumer sales promotion, trade sales promotion, the risks of sales promotion, Support media and promotional aids, Event sponsorship"
      },
      {
        "week_number": 7,
        "topic": "Marketing Communication Mix (Continue) Personal Selling, publicity and public relation, Corporate advertising, Integrated brand promotion"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Designing Advertising Advertisement layout, design features, features of best layout design."
      },
      {
        "week_number": 10,
        "topic": "Advertising Media Out of home media, billboards, digital billboards, public transportation ads and posters,"
      },
      {
        "week_number": 11,
        "topic": "Advertising Media (Continue) Broadcast media, television, internet, audio podcasts, video content, and others, purpose of broadcasting media, features"
      },
      {
        "week_number": 12,
        "topic": "Advertising Media (Continue) Print media, books and kinds of books, newspaper and its function, magazine and its functions, outdoor billboards, yellow pages"
      },
      {
        "week_number": 13,
        "topic": "Message Strategy A review of information processing process, categories of message strategy, brand Strategy, verbal vs. visual messages, types of advertising appeal"
      },
      {
        "week_number": 14,
        "topic": "Managing Personal Information Direct marketing, purpose and importance, the evolution of direct marketing, database marketing, media applications in direct marketing"
      },
      {
        "week_number": 15,
        "topic": "Managing Personal Information Interactive Marketing, word of mouth, sales force management"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4131": {
    "code": "BUSA4131",
    "title": "Retail Management",
    "credit_hours": "3 (3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "An introduction to retailing Reasons for studying retailing, special characteristics of retailing. Importance of retail strategy,"
      },
      {
        "week_number": 2,
        "topic": "Building and sustaining relationships in retailing Retailing Value, value chain. Retailor relationships; customer relationships, channel relationships."
      },
      {
        "week_number": 3,
        "topic": "Building and sustaining relationships in retailing Retailing of goods and services and their differences. Ethics, social responsibility and consumerism."
      },
      {
        "week_number": 4,
        "topic": "Retail institutions by ownership Retail institutions characterized by ownership, independent, chains, franchising, leased department"
      },
      {
        "week_number": 5,
        "topic": "Retail institutions by ownership vertical marketing system, consumerism"
      },
      {
        "week_number": 6,
        "topic": "Retail institutions by store-based strategy mix The wheel of retailing, scrambled merchandising, the retail life cycle. Retail institutions; food oriented retailors, general merchandise retailors."
      },
      {
        "week_number": 7,
        "topic": "Retail institutions by store-based strategy mix Direct marketing, direct selling, vending machines. Other nontraditional forms of retailing; video kiosks, airport retailing."
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Choosing a store location The importance of location to retailer, characteristics of trading areas; characteristics of the population."
      },
      {
        "week_number": 10,
        "topic": "Choosing a store location Types of locations; the isolated store, the unplanned business district, the planned shopping center. Site evaluation."
      },
      {
        "week_number": 11,
        "topic": "Merchandise management The buying organization, merchandise category, managing inventory turnover, merchandise management process. Forecasting sales; forecasting staple merchandise, forecasting for services retailors."
      },
      {
        "week_number": 12,
        "topic": "Merchandise management Developing an assortment plan, category variety and assortment. Setting inventory and product availability levels; model stock plan."
      },
      {
        "week_number": 13,
        "topic": "Buying merchandise Brand alternatives, national brands, private label brands, meeting national brand vendors, national buying process. Developing and sourcing private label merchandise."
      },
      {
        "week_number": 14,
        "topic": "Buying merchandise Strategic relationships; defining strategic relationships, maintaining relationships and building partnering relationships."
      },
      {
        "week_number": 15,
        "topic": "Retail pricing Pricing strategies, high/low pricing, everyday low pricing, and advantages of the pricing strategies."
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4132": {
    "code": "BUSA4132",
    "title": "Marketing Research",
    "credit_hours": "3 (3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction Marketing Research (MR) and its importance, situation analysis and marketing strategy (problem identification vs. problem solving research), MR industry, MR suppliers, ethics in MR"
      },
      {
        "week_number": 2,
        "topic": "Characteristics of good MR Purposiveness, rigor, testability, precision and confidence, generalizability, objectivity, replicability, parsimony"
      },
      {
        "week_number": 3,
        "topic": "MR process Initiative, design, execution, reporting. Management problem vs. MR problem. Problem understanding, problem definition, and problem clarity"
      },
      {
        "week_number": 4,
        "topic": "Secondary data Secondary data in MR. internal sources of secondary data, external sources of secondary data"
      },
      {
        "week_number": 5,
        "topic": "Exploratory research design Purpose of exploratory research, methods of exploratory research design. Focus groups. Depth interviews. Projective techniques"
      },
      {
        "week_number": 6,
        "topic": "Descriptive research design Purpose of descriptive research. Survey and its types. Observation methods"
      },
      {
        "week_number": 7,
        "topic": "Causal research design Causal (cause-and-effect) research, why experiments? Controlling the exogenous variables, matching technique, control and treatment groups."
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Causal research design Experiment designs: after only, one group pre-test post-test design, static group design, post-test only control group design, pre-test, post-test control group design, time series design. Internal and external validity"
      },
      {
        "week_number": 10,
        "topic": "Scales and measurement Levels of scales, types of scales used in MR"
      },
      {
        "week_number": 11,
        "topic": "Sampling techniques Sampling and its techniques. Non-probability sampling: convenience sampling, judgmental sampling, snowball sampling, quota sampling. Probability sampling: simple random sampling, systematic sampling, stratified sampling, cluster sampling"
      },
      {
        "week_number": 12,
        "topic": "Questionnaire design Do’s and Don’ts of questionnaire design, types of questions, sequence of questions, length of questionnaire, pre-testing"
      },
      {
        "week_number": 13,
        "topic": "Data collection and analysis Data collection techniques in MR. Data preparation and analysis, descriptive analysis (frequencies, averages, dispersion), charts and graphs, correlation analysis, t-tests, chi-square test, regression analysis, factor analysis."
      },
      {
        "week_number": 14,
        "topic": "MR Report writing and presentation MR proposal, MR report, presentation techniques"
      },
      {
        "week_number": 15,
        "topic": "Demand forecasting Various methods of forecasting demand"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4133": {
    "code": "BUSA4133",
    "title": "Brand Management",
    "credit_hours": "03 (3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Course Overview: Chapter 1 Brands and brand management. Customer –based brand equity"
      },
      {
        "week_number": 2,
        "topic": "Customer –based brand equity Brand positioning and values"
      },
      {
        "week_number": 3,
        "topic": "Syllabus Content & Practical Applications for Week 3"
      },
      {
        "week_number": 4,
        "topic": "Choosing brand elements to build brand equity. Designing marketing program to build brand equity."
      },
      {
        "week_number": 5,
        "topic": "- Designing marketing program to build brand equity. Integrating marketing communication to build brand equity. Integrating marketing communication to build brand equity."
      },
      {
        "week_number": 6,
        "topic": "Syllabus Content & Practical Applications for Week 6"
      },
      {
        "week_number": 7,
        "topic": "Syllabus Content & Practical Applications for Week 7"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Leveraging secondary brand knowledge to build brand equity. Leveraging secondary brand knowledge to build brand equity."
      },
      {
        "week_number": 10,
        "topic": "Developing a brand equity measurement and management system Developing a brand equity measurement and management system"
      },
      {
        "week_number": 11,
        "topic": "Measuring sources of brand equity Measuring sources of brand equity: Capturing customer mind set"
      },
      {
        "week_number": 12,
        "topic": "Measuring outcomes of brand equity: capturing market performance: Capturing customer mind set Measuring outcomes of brand equity: capturing market performance"
      },
      {
        "week_number": 13,
        "topic": "Designing and implementing branding strategies Designing and implementing branding strategies"
      },
      {
        "week_number": 14,
        "topic": "Introducing and naming new products and brand extensions. Introducing and naming new products and brand extensions."
      },
      {
        "week_number": 15,
        "topic": "Managing Brand over Time Final term presentation/ project"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4158": {
    "code": "BUSA4158",
    "title": "Digital Marketing",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Week Content; Introduction to Digital Marketing"
      },
      {
        "week_number": 2,
        "topic": "Importance & Benefits; Website Essentials"
      },
      {
        "week_number": 3,
        "topic": "User Experience (UX); Search Engine Optimization (SEO)"
      },
      {
        "week_number": 4,
        "topic": "Keyword Research; Content Marketing"
      },
      {
        "week_number": 5,
        "topic": "Blogging & Video Marketing; Social Media Marketing"
      },
      {
        "week_number": 6,
        "topic": "Engagement & Growth; Email marketing"
      },
      {
        "week_number": 7,
        "topic": "▪ List Building & Segmentation; Online Advertising"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Analytics and Measurement; Google Analytics"
      },
      {
        "week_number": 10,
        "topic": "Mid Term; Mobile Marketing"
      },
      {
        "week_number": 11,
        "topic": "Mobile SEO; E-Commerce Marketing"
      },
      {
        "week_number": 12,
        "topic": "Conversion Optimization; Digital Marketing Ethics"
      },
      {
        "week_number": 13,
        "topic": "Brand Integrity; Emerging Trends"
      },
      {
        "week_number": 14,
        "topic": "AI & Automation in Marketing; Project Planning"
      },
      {
        "week_number": 15,
        "topic": "Execute and monitor campaigns; presentation of a small-scale data analysis project."
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4134": {
    "code": "BUSA4134",
    "title": "Training Interventions in Job Skills",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction to Employee Training and Development The Context and Environment of Training, The Role of the Trainer, Marketing the Training Function, The Forces Influencing Working and Learning,"
      },
      {
        "week_number": 2,
        "topic": "Strategic Training Introduction, Evolution, The Strategic Training and Development Process, Organizational Characteristics That Influence Training, Training Needs in Different Strategies."
      },
      {
        "week_number": 3,
        "topic": "Needs Assessment Why and What is needs Assessment, Methods used in needs assessment, The needs assessment process, Scope of needs assessment."
      },
      {
        "week_number": 4,
        "topic": "Learning Theories Reinforcement Theory, Social Learning Theory, Goal Theories, Need Theories, Expectancy Theory, Adult Learning Theory, Information Processing Theory, Instructional Emphasis for learning."
      },
      {
        "week_number": 5,
        "topic": "Transfer of Training Theories Theory of Identical Elements, Stimulus Generalization Approach, Cognitive Theory of Transfer, The Learning Process"
      },
      {
        "week_number": 6,
        "topic": "Effective training design and evaluation Considerations in Designing Effective Programs, Reasons for Evaluating Training, Formative Vs Summative Evaluation, Training Evaluation Process"
      },
      {
        "week_number": 7,
        "topic": "Training Evaluation Outcomes Used in the Evaluation of Training Programs, Determining Whether Outcomes Are Appropriate, Evaluation Practices, Evaluation design, Overcoming Evaluation Obstacles, Determining return of investment."
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Traditional Training Methods Presentation Methods, hands-on Methods, Group Building methods. Pros and cons associated with choosing a particular training method."
      },
      {
        "week_number": 10,
        "topic": "Technology-Based Training Methods Technology’s Influence on Training and Learning, Computer-Based Training, Online Learning, Web- Based Training,"
      },
      {
        "week_number": 11,
        "topic": "Technology-Based Training Methods E-Learning, Developing Effective Online Learning, Social Networks, Blended Learning, Simulations and Games, Mobile Technology and Learning, Adaptive Training, Distance Learning, Technologies For Training Support, Choosing New Technology Training Methods."
      },
      {
        "week_number": 12,
        "topic": "Employee Development The Relationship Among Development, Training, and Careers, Development Planning Systems"
      },
      {
        "week_number": 13,
        "topic": "Career Management What is career and career Management, Importance, Traditional Vs Protean Career?"
      },
      {
        "week_number": 14,
        "topic": "Career Management Systems."
      },
      {
        "week_number": 15,
        "topic": "Companies Strategies for Employee Development."
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4135": {
    "code": "BUSA4135",
    "title": "International Human Resource Management",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction & overview of HRM: The internationalization of human resource"
      },
      {
        "week_number": 2,
        "topic": "management, The international HRM Function/Environment, International and Diversity"
      },
      {
        "week_number": 3,
        "topic": "Issues ,The Legal and Regulatory Environment"
      },
      {
        "week_number": 4,
        "topic": "Meeting Human Resource Requirements: Jobs, Analysis/Design, Planning, International"
      },
      {
        "week_number": 5,
        "topic": "Recruitment and Selection."
      },
      {
        "week_number": 6,
        "topic": "Performance Management: The concept of performance management, PM in the MNE,"
      },
      {
        "week_number": 7,
        "topic": "PM of international assignees.; Training and Development in HRM: Training in the MNE, Issues related to global training"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "and development, Cross-cultural preparation for international assignees, Knowledge"
      },
      {
        "week_number": 10,
        "topic": "management in the MNE."
      },
      {
        "week_number": 11,
        "topic": "Compensation: Global remuneration in the MNE, Compensation and benefits for"
      },
      {
        "week_number": 12,
        "topic": "international assignees, Global C&B management in the MNE.; Repatriation: Repatriation process, Readjustment Challenge, Individual reaction to"
      },
      {
        "week_number": 13,
        "topic": "repatriation, Designing a repatriate program, Repatriation activities and practices, Predictors"
      },
      {
        "week_number": 14,
        "topic": "of repatriation maladjustment."
      },
      {
        "week_number": 15,
        "topic": "Labor Relation and HRM: Employee Rights and Discipline, International Labor Relation; and Collective Bargaining, The international framework of ethics."
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4136": {
    "code": "BUSA4136",
    "title": "Performance and Compensation Management",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "I. Performance Management"
      },
      {
        "week_number": 2,
        "topic": "Introduction: What is performance, Definitions of performance appraisals, Uses of; performance appraisal, making performance appraisal to work, Management’s response to"
      },
      {
        "week_number": 3,
        "topic": "appraisal systems, Top management’s response to appraisal systems.; Performance appraisal systems: Rating scales, Ranking method, Paired comparison method, Critical"
      },
      {
        "week_number": 4,
        "topic": "incident method, Work standards, Essays Method, Forced distribution, Management by objective"
      },
      {
        "week_number": 5,
        "topic": "(MBO),360 degree feedback.; Design of appraisal system: Designing of an effective appraisal system, Problems in"
      },
      {
        "week_number": 6,
        "topic": "appraisal system, Critical appreciation of the appraisal systems currently adopted by; important organizations."
      },
      {
        "week_number": 7,
        "topic": "Managing team performance: Definition and Importance of Teams, Types of Teams and; Implications for Performance Management, Rewarding Team Performance"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "II. Compensation Management Introduction: Level of compensation benefits"
      },
      {
        "week_number": 10,
        "topic": "Components of a compensation system: Financial components, Non-Financial; components,"
      },
      {
        "week_number": 11,
        "topic": "Compensation equity.; Benefits and other compensation issues: Legal, Voluntary, Employee Services, Premium"
      },
      {
        "week_number": 12,
        "topic": "Job evaluation: Introduction, Definition, Importance of implementing job evaluation, Job"
      },
      {
        "week_number": 13,
        "topic": "evaluation methods (Ranking method, Classification method, Factor comparison method,; Point system), Practical application of job evaluation systems."
      },
      {
        "week_number": 14,
        "topic": "Pay Structure and Pay Scale: Introduction, Guidelines for the compensation manager,; Designing of a basic pay structure, Comparative study of the existing pay structure"
      },
      {
        "week_number": 15,
        "topic": "Alignment of Compensation Systems with Strategic Planning. Functional Challenges and; Issues for Compensation System."
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4137": {
    "code": "BUSA4137",
    "title": "Industrial Relations and Labor Laws in Pakistan",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Economy and labor force in Pakistan Introduction, The Pakistan economy, Labor force in Pakistan, Key issues and challenges, Crisis management in IR"
      },
      {
        "week_number": 2,
        "topic": "Approaches to Industrial Relations: Meaning and scope of industrial relations, The system’s frame Work, Theoretical perspectives, Rule-Making and industrial relations, Basic concepts and values."
      },
      {
        "week_number": 3,
        "topic": "Trade Unions: Introduction, Theories of the trade union movement, Trade unions in Pakistan, Trade unions and economic development, Legal framework, Trade union recognition, Union recognition Agreement."
      },
      {
        "week_number": 4,
        "topic": "Trade Union Structures: Models of national trade union movements, International trade union federations, Managerial trade unions, Women in trade unions, Trade union unity, and trade union Mergers."
      },
      {
        "week_number": 5,
        "topic": "Collective Bargaining: The concept and nature of collective bargaining, The legal framework of collective bargaining, Levels of bargaining and agreements, Collective bargaining and Stakeholders, Negotiation techniques and skills, Drafting of an agreement."
      },
      {
        "week_number": 6,
        "topic": "Collective Bargaining: Negotiation techniques and skills, Drafting of an agreement, Bargaining Power and Industrial Relations, Case study activity to make students more clear about the collective bargaining approach. (ILO case studies suggested) Suggested reading: (Kirkbride, P.S. and Durcan, J. (1987), \"Bargaining Power and Industrial Relations\", Personnel Review, Vol. 16 No. 2, pp. 3-11. https://doi.org/10.1108/eb055557)"
      },
      {
        "week_number": 7,
        "topic": "The Contract of Employment: Introduction, The industrial employment act, the contract labor act, Companies ordinance 1984, laws relating to companies."
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Public Policy and Wages & Reward Systems: Wage theories, Wage system in Pakistan, The wages act."
      },
      {
        "week_number": 10,
        "topic": "Public Policy and Wages & Reward Systems: Minimum wage act, Bonuses, Profit sharing and stock options, pay structures, Contemporary issues in wage system."
      },
      {
        "week_number": 11,
        "topic": "Working conditions, Safety, Health and Environment: Introduction, Working conditions, occupational health and safety, Organizational commitment."
      },
      {
        "week_number": 12,
        "topic": "Dispute resolution and Industrial Harmony: Industrial conflict, Legal frame work, Procedures, powers and duties of authorities, Strikes and Lockouts, Unfair labor practices, Labor management relations."
      },
      {
        "week_number": 13,
        "topic": "Labor Administration: Introduction, Labor administration machinery, improving labor inspection,strengthening labor court administration."
      },
      {
        "week_number": 14,
        "topic": "Management of Industrial Relations:"
      },
      {
        "week_number": 15,
        "topic": "Syllabus Content & Practical Applications for Week 15"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4138": {
    "code": "BUSA4138",
    "title": "Recruitment and Selection",
    "credit_hours": "3",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Week Content; Assessing HR Needs: Strategic nature of HR"
      },
      {
        "week_number": 2,
        "topic": "HR Planning: Succession planning, quantitative techniques to; forecast HR supply and demand"
      },
      {
        "week_number": 3,
        "topic": "Job Design: Difference between job analysis and job design; Job Evaluation: Points method of doing job evaluation"
      },
      {
        "week_number": 4,
        "topic": "Recruitment Sources: Internal sources, external sources; The Selection Process: Comprehensive selection process"
      },
      {
        "week_number": 5,
        "topic": "Evaluating Job Applications: Initial screening, assigning; weights"
      },
      {
        "week_number": 6,
        "topic": "Interviews: Structured interviews, unstructured interviews,; online interviews, telephonic interviews"
      },
      {
        "week_number": 7,
        "topic": "its types, reliability and its types; Final Selection: Basis of final selection"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Project on recruitment and selection: The project will; include organizational requirements, detailed analysis of job/s,"
      },
      {
        "week_number": 10,
        "topic": "complete selection process, and orientation, for comprehensive; understanding and practical application of this course"
      },
      {
        "week_number": 11,
        "topic": "Recruiting, Interviewing, selecting and orienting new employees by Diane Arthur; Recruitment and Selection by Gareth Roberts"
      },
      {
        "week_number": 12,
        "topic": "Human Resource Management by Garry Desseler; Note: In addition to the above, any other text or book referred by Instructor can also be"
      },
      {
        "week_number": 13,
        "topic": "included.; Supply Chain Management Courses"
      },
      {
        "week_number": 14,
        "topic": "Quality Management in Supply Chain BUSA7131 3 (3+0); Managing Supply Chains BUSA7182 3 (3+0)"
      },
      {
        "week_number": 15,
        "topic": "Distribution Networks & Design BUSA4152 3 (3+0); Inventory Management BUSA4153 3 (3+0)"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA7131": {
    "code": "BUSA7131",
    "title": "Quality Management in Supply Chains",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Quality & Supply Chain Management: Historical Perspective"
      },
      {
        "week_number": 2,
        "topic": "Quality Management Practices; Quality assurance in supply chains"
      },
      {
        "week_number": 3,
        "topic": "Quality Management Tools and Techniques; Application of Quality Tools in Supply Chains"
      },
      {
        "week_number": 4,
        "topic": "SCQM Strategies: Lean Management"
      },
      {
        "week_number": 5,
        "topic": "Lean Tools: Value Stream Mapping; SCQM Strategies: Agility"
      },
      {
        "week_number": 6,
        "topic": "SCQM (Hybrid) Strategies: Leagile Supply Chains; SC integration"
      },
      {
        "week_number": 7,
        "topic": "Supplier Quality Management; Managing SC Processes: The role of quality standards"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Role of IT in SCQM"
      },
      {
        "week_number": 10,
        "topic": "Sustainable Supply Chains; Suggested Texts (Latest Editions):"
      },
      {
        "week_number": 11,
        "topic": "Management by John Oakland 6th ed..; Quality Management: A Customer Driven Approach by Raouf, A., Yusuf, I"
      },
      {
        "week_number": 12,
        "topic": "The Management and Control of Quality. 6th ed. By Evans, James R., and William M. Lindsay; Useful links:"
      },
      {
        "week_number": 13,
        "topic": "Pakistan Institute of Quality http://www.piqc.com.pk/; National Productivity Organization http://www.npo.gov.pk/default.asp"
      },
      {
        "week_number": 14,
        "topic": "Malcolm Baldrige National Quality Award http://www.quality.nist.gov/ European Society For; Quality http://www.efqm.org/en/"
      },
      {
        "week_number": 15,
        "topic": "Note: In addition to the above, any other book referred by the instructor can be; included."
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA7128": {
    "code": "BUSA7128",
    "title": "Managing Supply Chains",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction to Supply Chain Management"
      },
      {
        "week_number": 2,
        "topic": "SC: Achieving Strategic Fit and Scope"
      },
      {
        "week_number": 3,
        "topic": "SC Drivers and Metrics; Network Design in the Supply Chain"
      },
      {
        "week_number": 4,
        "topic": "Managing Risk in the Supply Chain"
      },
      {
        "week_number": 5,
        "topic": "Demand Forecasting/Management; Inventory Management"
      },
      {
        "week_number": 6,
        "topic": "Aggregate Planning"
      },
      {
        "week_number": 7,
        "topic": "Procurement and Outsourcing; Designing the SC for conflicting goals"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Customer Value including SCOR"
      },
      {
        "week_number": 10,
        "topic": "IT in a supply chain"
      },
      {
        "week_number": 11,
        "topic": "Special Topics in Supply Chain Management; Suggested Texts (Latest Editions):"
      },
      {
        "week_number": 12,
        "topic": "Supply Chain Management. By: Sunil Chopra, Peter Meindl, and D.V. Kalra"
      },
      {
        "week_number": 13,
        "topic": "Designing and Managing the Supply Chain, By: David Simchi Levi, Philip Kaminsky, Edith; Simchi Levi, and Ravi Shankar."
      },
      {
        "week_number": 14,
        "topic": "Logistics and Supply Chain Management by: Martin Christopher"
      },
      {
        "week_number": 15,
        "topic": "Note: In addition to the above, any other book referred by the instructor can be included.; Instructor can also modify course outlines according to the students and current need."
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA5155": {
    "code": "BUSA5155",
    "title": "Logistics Management",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Logistics an introduction"
      },
      {
        "week_number": 2,
        "topic": "Logistic design for distribution channels"
      },
      {
        "week_number": 3,
        "topic": "Customer service"
      },
      {
        "week_number": 4,
        "topic": "Supply chain management; Warehousing design and operations"
      },
      {
        "week_number": 5,
        "topic": "Palletized and non-palletized movement"
      },
      {
        "week_number": 6,
        "topic": "Order picking and packing"
      },
      {
        "week_number": 7,
        "topic": "Material handling system; Material storage system"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Inventory management"
      },
      {
        "week_number": 10,
        "topic": "Transportation"
      },
      {
        "week_number": 11,
        "topic": "Logistic outsourcing; Suggested Texts (Latest Editions):"
      },
      {
        "week_number": 12,
        "topic": "Logistic Management by V. V. Sople"
      },
      {
        "week_number": 13,
        "topic": "The Hand Book of Logistics and Distribution Management ; Understanding the Supply Chain; th Edition by Alan Rushton, Phil Croucher and Peter Baker"
      },
      {
        "week_number": 14,
        "topic": "Business Logistics and Supply Chain Management by Ronald H. Ballou"
      },
      {
        "week_number": 15,
        "topic": "Note: In addition to the above, any other book referred by the instructor can be included.; Instructor can also modify course outlines according to the students and current need"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4152": {
    "code": "BUSA4152",
    "title": "Distribution Networks & Design",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Importance of Logistics and Distribution"
      },
      {
        "week_number": 2,
        "topic": "Globalization and Integration; Integrated Systems"
      },
      {
        "week_number": 3,
        "topic": "Physical distribution channel types & Structures"
      },
      {
        "week_number": 4,
        "topic": "Channel selection; Logistics & distribution"
      },
      {
        "week_number": 5,
        "topic": "Multichannel fulfillment"
      },
      {
        "week_number": 6,
        "topic": "Floor Area Usage; Typical warehouse functions in a cross dock warehouse"
      },
      {
        "week_number": 7,
        "topic": "Palletized storage and movement; Non-Palletized storage and movement"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Order Picking"
      },
      {
        "week_number": 10,
        "topic": "Order Packing; Receiving and dispatch"
      },
      {
        "week_number": 11,
        "topic": "Warehouse Design; Warehouse management and information"
      },
      {
        "week_number": 12,
        "topic": "Comparison of different distribution models (FMCG, Pharma, Cement)"
      },
      {
        "week_number": 13,
        "topic": "Suggested Texts (Latest Editions):; The Handbook of Logistics and distribution management”, 5th Edition,"
      },
      {
        "week_number": 14,
        "topic": "By Alan Rushton,; “Supply Chain Management” 6th Edition By Chopra, Sunil, and Peter Meindl."
      },
      {
        "week_number": 15,
        "topic": "Note: In addition to the above, any other book referred by the instructor can be included.; Instructor can also modify course outlines according to the students and current need."
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4153": {
    "code": "BUSA4153",
    "title": "Inventory Management",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction to Stocks and Inventories"
      },
      {
        "week_number": 2,
        "topic": "Stocks within an Organization"
      },
      {
        "week_number": 3,
        "topic": "Economic Order Quantity"
      },
      {
        "week_number": 4,
        "topic": "Models for Known Demand"
      },
      {
        "week_number": 5,
        "topic": "Models for Uncertain Demand"
      },
      {
        "week_number": 6,
        "topic": "Models for Uncertain Demand"
      },
      {
        "week_number": 7,
        "topic": "Models for Uncertain Demand"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Sources of Information"
      },
      {
        "week_number": 10,
        "topic": "Forecasting Demand"
      },
      {
        "week_number": 11,
        "topic": "Planning and Stocks"
      },
      {
        "week_number": 12,
        "topic": "Material Requirements Planning"
      },
      {
        "week_number": 13,
        "topic": "Just-in-Time"
      },
      {
        "week_number": 14,
        "topic": "Lead time and EOQ"
      },
      {
        "week_number": 15,
        "topic": "Lead time and EOQ"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4154": {
    "code": "BUSA4154",
    "title": "Supply  Management",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Introduction to Purchasing and Supply Management:"
      },
      {
        "week_number": 2,
        "topic": "Supply strategy"
      },
      {
        "week_number": 3,
        "topic": "Difference between business buying and consumer buying"
      },
      {
        "week_number": 4,
        "topic": "Supply management process and technology"
      },
      {
        "week_number": 5,
        "topic": "Make or Buy, Insourcing, and Outsourcing"
      },
      {
        "week_number": 6,
        "topic": "Need Identification and Specification"
      },
      {
        "week_number": 7,
        "topic": "Purchasing Innovation and Role of Quality in Supply Management"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "The Role of Pricing in Supply Management"
      },
      {
        "week_number": 10,
        "topic": "Cost Management"
      },
      {
        "week_number": 11,
        "topic": "Supplier Selection"
      },
      {
        "week_number": 12,
        "topic": "Supplier Evaluation and Supplier Relationships"
      },
      {
        "week_number": 13,
        "topic": "Buying Business Services"
      },
      {
        "week_number": 14,
        "topic": "Contract Management for Complex Projects"
      },
      {
        "week_number": 15,
        "topic": "Legal and Ethical Considerations in Supply Management; Global Supply Management"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4155": {
    "code": "BUSA4155",
    "title": "Islamic Insurance and Investments",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "The Islamic Takaful System Part 1:; Islamic Appraisal of Conventional Insurance"
      },
      {
        "week_number": 2,
        "topic": "The Need for Sharī‘ah-Compliant Insurance; The Concept of Takaful Ta’awuni"
      },
      {
        "week_number": 3,
        "topic": "Takaful vs Conventional Insurance; The Islamic Takaful System-Part 2"
      },
      {
        "week_number": 4,
        "topic": "The Mudarabah-based Takaful Model; The Wakalah-based Takaful Model"
      },
      {
        "week_number": 5,
        "topic": "Deviations in Mudarabah and Wakala Takaful; Sharing Expenses in Takaful Products"
      },
      {
        "week_number": 6,
        "topic": "Applications of Takaful in Family Insurance; Applications of Takaful in General Insurance"
      },
      {
        "week_number": 7,
        "topic": "Mutual Funds and Their Advantages; Various Structures in Mutual Funds"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Hedge Funds; Real Estate Investment Trusts (REITs)"
      },
      {
        "week_number": 10,
        "topic": "Islamic Perspectives on Mutual Funds and REITs; Islamic Investment Fund"
      },
      {
        "week_number": 11,
        "topic": "Murabaha-Based Commodity Debt Fund; Ijarah-Based Debt Fund"
      },
      {
        "week_number": 12,
        "topic": "Conditions Governing Islamic Equity Funds; Islamic Hedge Fund"
      },
      {
        "week_number": 13,
        "topic": "Recognised Sukuks; Ijarah Sukuk"
      },
      {
        "week_number": 14,
        "topic": "BBA Sukuk; Muqaradah Sukuk"
      },
      {
        "week_number": 15,
        "topic": "The Advantages of a Sukuk Market; The International Sukuk Market"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4156": {
    "code": "BUSA4156",
    "title": "Islamic Banking and Finance",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Islamic Economic System: the factors of production, equitable distribution of wealth in islam"
      },
      {
        "week_number": 2,
        "topic": "Prohibition of Riba: Riba and its types, Prohibition of Riba in Quran & Ahadits"
      },
      {
        "week_number": 3,
        "topic": "Islamic Banking Framework: Shariah Governance Framework, Islamic Banking practices"
      },
      {
        "week_number": 4,
        "topic": "Islamic Banking Framework: Shariah Governance Framework, Islamic Banking practices"
      },
      {
        "week_number": 5,
        "topic": "Islamic Banking Framework: Shariah Governance Framework, Islamic Banking practices"
      },
      {
        "week_number": 6,
        "topic": "Islamic Banking Framework: Shariah Governance Framework, Islamic Banking practices"
      },
      {
        "week_number": 7,
        "topic": "Islamic Banking Framework: Shariah Governance Framework, Islamic Banking practices"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "vs Conventional Banking Practices."
      },
      {
        "week_number": 10,
        "topic": "Islamic Contract of Sale: valid sale in islamic framework, sale contract"
      },
      {
        "week_number": 11,
        "topic": "Modes of Islamic Financing: Murabaha, Mudarabah, Ijarah, Musharakah, Diminishing"
      },
      {
        "week_number": 12,
        "topic": "Musharakah, Salam, Istisna etc."
      },
      {
        "week_number": 13,
        "topic": "Musharakah, Salam, Istisna etc."
      },
      {
        "week_number": 14,
        "topic": "Musharakah, Salam, Istisna etc."
      },
      {
        "week_number": 15,
        "topic": "Musharakah, Salam, Istisna etc."
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  },
  "BUSA4157": {
    "code": "BUSA4157",
    "title": "Islamic Capital Markets",
    "credit_hours": "3(3+0)",
    "weeks": [
      {
        "week_number": 1,
        "topic": "Islamic Capital Markets & Islamic Alternative Assets:"
      },
      {
        "week_number": 2,
        "topic": "Introduction to Islamic Finance & Islamic Capital Markets."
      },
      {
        "week_number": 3,
        "topic": "Overview of Global and local markets and key developments.; Key components of an Islamic Capital Market."
      },
      {
        "week_number": 4,
        "topic": "Sources of finance for new & existing companies."
      },
      {
        "week_number": 5,
        "topic": "Evaluation of Capital Markets from Shariah perspective.; Sukuk structuring, modern business practices"
      },
      {
        "week_number": 6,
        "topic": "Sukuk - Concept, Structure & Applications"
      },
      {
        "week_number": 7,
        "topic": "Legal Documentation & Challenges for Sukuk; Corporate and Hybrid Sukuk"
      },
      {
        "week_number": 8,
        "topic": "MID TERM EXAMINATION"
      },
      {
        "week_number": 9,
        "topic": "Retail Sukuk emergence"
      },
      {
        "week_number": 10,
        "topic": "Investment Strategies"
      },
      {
        "week_number": 11,
        "topic": "Introduction to Islamic Funds & Mutual Fund.; Asset Management Company (AMC) - Nature of AMC from Shariah perspective"
      },
      {
        "week_number": 12,
        "topic": "Islamic Real Estate Investment Trusts (IREITs)"
      },
      {
        "week_number": 13,
        "topic": "Islamic Treasury Operations, Products and Challenges.; Governing Regulations of Equity market & indices"
      },
      {
        "week_number": 14,
        "topic": "Working of Equity Market."
      },
      {
        "week_number": 15,
        "topic": "Rules for Shariah Compliant Equity Investments; Stock Screening Methodologies/criterion:"
      },
      {
        "week_number": 16,
        "topic": "FINAL TERM EXAMINATION"
      }
    ]
  }
,
  "BUSA7136": {
  "code": "BUSA 7136",
  "title": "Quantitative Methods & Decisions",
  "credit_hours": "3(3+0)",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Business Mathematics – Background, Systems of equations and their applications"
    },
    {
      "week_number": 2,
      "topic": "Matrices: Matrix Operations, Inversion and Solving Linear Systems"
    },
    {
      "week_number": 3,
      "topic": "Financial Mathematics: Simple and Compound Interest, Annuities, Amortization"
    },
    {
      "week_number": 4,
      "topic": "Basic Concepts of Statistics: Population, Sample, Variables, Frequency Distributions"
    },
    {
      "week_number": 5,
      "topic": "Data Condensation and Presentation: Graphical Representation, Histograms, Polygons"
    },
    {
      "week_number": 6,
      "topic": "Measures of Central Tendency for Grouped Data: Mean, Median, Mode"
    },
    {
      "week_number": 7,
      "topic": "Measures of Dispersion: Variance, Standard Deviation, Coefficient of Variation"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Index Numbers: Unweighted and Weighted Aggregate Indices, Price & Quantity Indices"
    },
    {
      "week_number": 10,
      "topic": "Probability, Risk and Uncertainty: Concepts, Rules of Addition and Multiplication"
    },
    {
      "week_number": 11,
      "topic": "Probability Distributions: Discrete Distributions, Binomial and Poisson Distributions"
    },
    {
      "week_number": 12,
      "topic": "Continuous Probability Distributions: Normal Distribution and Standard Normal Scores"
    },
    {
      "week_number": 13,
      "topic": "Correlation and Regression Analysis: Scatter Diagrams, Pearson r, Simple Linear Regression"
    },
    {
      "week_number": 14,
      "topic": "Time Series Analysis: Components, Trend Analysis and Forecasting in Business"
    },
    {
      "week_number": 15,
      "topic": "Decision Theory: Payoff Tables, Decision Trees, Decision Under Risk and Uncertainty"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA7137": {
  "code": "BUSA 7137",
  "title": "Marketing Concepts & Strategies",
  "credit_hours": "3(3+0)",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Basic concepts of marketing: Core concepts, Needs, Wants, Demands, Marketing Management"
    },
    {
      "week_number": 2,
      "topic": "Marketing Environment: Micro and Macro Environment, PESTEL Analysis"
    },
    {
      "week_number": 3,
      "topic": "Strategic Marketing Planning: Mission, Goals, Strategic Business Units (SBUs)"
    },
    {
      "week_number": 4,
      "topic": "Marketing Strategy: Competitive Advantage, Porter's Generic Strategies, SWOT Analysis"
    },
    {
      "week_number": 5,
      "topic": "Consumer Behavior: Decision-Making Process, Psychological and Social Influences"
    },
    {
      "week_number": 6,
      "topic": "Consumer Driven Marketing Strategy: Market Segmentation, Targeting and Positioning (STP)"
    },
    {
      "week_number": 7,
      "topic": "Differentiation and Positioning Strategies, Value Proposition Formulation"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Products, Services and Brands: Product Levels, Classifications, Product Life Cycle (PLC)"
    },
    {
      "week_number": 10,
      "topic": "New Product Development Process and Brand Equity Management"
    },
    {
      "week_number": 11,
      "topic": "Pricing: Understanding and Capturing Customer Value, Major Pricing Strategies"
    },
    {
      "week_number": 12,
      "topic": "Pricing Tactics, Discounts, Yield Management, Legal and Ethical Issues in Pricing"
    },
    {
      "week_number": 13,
      "topic": "Marketing Communication: Integrated Marketing Communication (IMC), Promotion Mix"
    },
    {
      "week_number": 14,
      "topic": "Advertising, Public Relations, Sales Promotion, Personal Selling and Digital Marketing"
    },
    {
      "week_number": 15,
      "topic": "Distribution Channels: Supply Chains, Channel Behavior, Intermediaries, Retailing & Wholesaling"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA7138": {
  "code": "BUSA 7138",
  "title": "Business Accounting",
  "credit_hours": "3(3+0)",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Basic Concepts of Accounting: Nature, Purpose, Users and Branches of Accounting"
    },
    {
      "week_number": 2,
      "topic": "Generally Accepted Accounting Principles (GAAP) and Conceptual Framework"
    },
    {
      "week_number": 3,
      "topic": "The Accounting Cycle: Recording Business Transactions, Journal Entries, Rules of Debit/Credit"
    },
    {
      "week_number": 4,
      "topic": "Ledger Accounts, Trial Balance Preparation and Error Detection"
    },
    {
      "week_number": 5,
      "topic": "Adjusting Entries: Accruals, Deferrals, Depreciation and Adjusted Trial Balance"
    },
    {
      "week_number": 6,
      "topic": "Preparation of Financial Statements: Income Statement, Statement of Owner's Equity, Balance Sheet"
    },
    {
      "week_number": 7,
      "topic": "Closing Entries, Post-Closing Trial Balance and Completing Accounting Cycle"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Accounting for Merchandising Business: Purchases, Sales, Discounts, Returns and Periodic/Perpetual Systems"
    },
    {
      "week_number": 10,
      "topic": "Accounting for Inventories: Valuation Methods (FIFO, LIFO, Weighted Average), Lower of Cost or Market"
    },
    {
      "week_number": 11,
      "topic": "Accounting for Assets: Receivables, Allowance for Doubtful Accounts, Notes Receivable"
    },
    {
      "week_number": 12,
      "topic": "Plant Assets, Natural Resources, Intangible Assets and Depreciation Methods"
    },
    {
      "week_number": 13,
      "topic": "Current and Non-Current Liabilities, Bond Valuation and Amortization"
    },
    {
      "week_number": 14,
      "topic": "Statement of Cash Flows: Operating, Investing, and Financing Activities (Direct and Indirect Methods)"
    },
    {
      "week_number": 15,
      "topic": "Interpretation of Financial Statements: Liquidity, Solvency and Profitability Ratios"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA7139": {
  "code": "BUSA 7139",
  "title": "Management Concepts & Practice",
  "credit_hours": "3(3+0)",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to Management: Definition, Functions, Skills and Roles of Managers"
    },
    {
      "week_number": 2,
      "topic": "Basic terminologies of Management and Historical Background (Classical, Behavioral, Modern)"
    },
    {
      "week_number": 3,
      "topic": "Critical Role of managers in organizations and Contemporary Managerial Challenges"
    },
    {
      "week_number": 4,
      "topic": "External and Internal Organizational Environment: Stakeholders, Ethics, and Social Responsibility"
    },
    {
      "week_number": 5,
      "topic": "Organizational Decision Making: Rational, Bounded Rationality, Intuitive, Group Decision Making"
    },
    {
      "week_number": 6,
      "topic": "Four functions of Managers - Planning: Foundations, Strategic Goals, MBO, Planning Tools"
    },
    {
      "week_number": 7,
      "topic": "Four functions of Managers - Organizing: Structure, Departmentalization, Chain of Command, Authority"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Four functions of Managers - Leading: Leadership Theories, Traits, Behavioral, Contingency Models"
    },
    {
      "week_number": 10,
      "topic": "Four functions of Managers - Controlling: Control Process, Types of Control, Financial and Operational Controls"
    },
    {
      "week_number": 11,
      "topic": "Managing Groups and Teams: Stages of Group Development, Team Cohesiveness, Managing Conflict"
    },
    {
      "week_number": 12,
      "topic": "Organizational Structure and Design: Mechanistic vs Organic Designs, Matrix and Virtual Structures"
    },
    {
      "week_number": 13,
      "topic": "Motivating Employees: Content Theories (Maslow, Herzberg), Process Theories (Vroom, Equity)"
    },
    {
      "week_number": 14,
      "topic": "Organizational Culture, Power, and Organizational Politics"
    },
    {
      "week_number": 15,
      "topic": "Information and Technology in Management: Digital Transformation, AI and Future of Management"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA7140": {
  "code": "BUSA 7140",
  "title": "Economics for Business",
  "credit_hours": "3(3+0)",
  "weeks": [
    {
      "week_number": 1,
      "topic": "The Fundamentals of Economics: Scarcity, Choice, Opportunity Cost, Economic Systems"
    },
    {
      "week_number": 2,
      "topic": "Consumer Behavior: Cardinal and Ordinal Utility Analysis, Indifference Curves, Budget Line"
    },
    {
      "week_number": 3,
      "topic": "Demand Analysis: Law of Demand, Determinants, Elasticity of Demand (Price, Income, Cross)"
    },
    {
      "week_number": 4,
      "topic": "Supply Analysis: Law of Supply, Elasticity of Supply, Market Equilibrium and Price Mechanism"
    },
    {
      "week_number": 5,
      "topic": "Theory of Production: Production Function, Short-Run and Long-Run, Law of Diminishing Returns"
    },
    {
      "week_number": 6,
      "topic": "Theory of Cost: Fixed, Variable, Marginal, Average Costs, Economies and Diseconomies of Scale"
    },
    {
      "week_number": 7,
      "topic": "Market Structures: Perfect Competition and Monopoly (Price and Output Determination)"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Market Structures: Monopolistic Competition and Oligopoly, Game Theory Basics"
    },
    {
      "week_number": 10,
      "topic": "National Income Accounting: GDP, GNP, NNP, Disposable Income, Measurement Approaches"
    },
    {
      "week_number": 11,
      "topic": "Basic Macroeconomic Relationships: Consumption, Savings, Investment, Multiplier and Accelerator"
    },
    {
      "week_number": 12,
      "topic": "Money, Banking and Financial System: Money Supply, Central Bank and Monetary Policy"
    },
    {
      "week_number": 13,
      "topic": "Fiscal Policy: Government Expenditures, Taxation, Budget Deficit and Public Debt"
    },
    {
      "week_number": 14,
      "topic": "Major Macroeconomic Issues: Inflation, Unemployment (Phillips Curve), Business Cycles"
    },
    {
      "week_number": 15,
      "topic": "International Economics: Exchange Rates, Balance of Payments, Stabilization Policies"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA7141": {
  "code": "BUSA 7141",
  "title": "Cost Management & Controls",
  "credit_hours": "3(3+0)",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Basic concepts of cost and Cost Accounting Conceptual Framework in Manufacturing"
    },
    {
      "week_number": 2,
      "topic": "Cost uses and classification: Direct, Indirect, Product, Period, Fixed, Variable costs"
    },
    {
      "week_number": 3,
      "topic": "Statement of cost of goods manufactured and sold statement preparation"
    },
    {
      "week_number": 4,
      "topic": "Job Order Costing: Cost Sheet, Applied FOH, Over/Under-applied Overhead"
    },
    {
      "week_number": 5,
      "topic": "Planning and Control of Materials: EOQ, Reorder Level, Safety Stock, Inventory Control"
    },
    {
      "week_number": 6,
      "topic": "Perpetual and Periodic Accounting System for Material and Labor Costs"
    },
    {
      "week_number": 7,
      "topic": "Labor and Factory Overhead: Incentive Wage Plans, FOH Allocation and Departmentalization"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Process Costing: Cost of Production Report, Equivalent Units of Production (FIFO & Weighted Avg)"
    },
    {
      "week_number": 10,
      "topic": "Process Costing with Lost/Spoiled Units, By-Products and Joint-Products Costing"
    },
    {
      "week_number": 11,
      "topic": "Activity Based Costing (ABC) and Activity Based Management (ABM)"
    },
    {
      "week_number": 12,
      "topic": "Cost-Volume-Profit (CVP) Analysis: Break-Even Point, Margin of Safety, Operating Leverage"
    },
    {
      "week_number": 13,
      "topic": "Standard Costing: Setting Standards, Variance Analysis (Material, Labor, Overhead)"
    },
    {
      "week_number": 14,
      "topic": "Budgeting and Budgetary Control: Master Budget, Cash Budget, Flexible Budgets"
    },
    {
      "week_number": 15,
      "topic": "Cost Control and Performance Reporting for Decision Making of Higher Management"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA7142": {
  "code": "BUSA 7142",
  "title": "Business & Entrepreneurship",
  "credit_hours": "3(3+0)",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Business Concept, types, characteristics, division and stakeholders of business"
    },
    {
      "week_number": 2,
      "topic": "Sole proprietorship and Partnership: Formation, Advantages, Disadvantages, Dissolution"
    },
    {
      "week_number": 3,
      "topic": "Joint stock company: Types, Memorandum, Articles of Association, Corporate Governance"
    },
    {
      "week_number": 4,
      "topic": "Capital types, IPO, Underwriting, and Securities Market Operations"
    },
    {
      "week_number": 5,
      "topic": "Meetings and Winding up of a company: Statutory, AGM, EGM, Liquidation Procedures"
    },
    {
      "week_number": 6,
      "topic": "Stock exchange: Trading of shares, Market indices, and Financial Risk Management"
    },
    {
      "week_number": 7,
      "topic": "The entrepreneurship and entrepreneurial mind: Mindset, Opportunity Recognition, Innovation"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Preparing for the new business plan: Planning, Presenting, Information needs, Writing Business Plan"
    },
    {
      "week_number": 10,
      "topic": "Implementing Business Plan: Operationalizing, Marketing Strategy, Financial Projections"
    },
    {
      "week_number": 11,
      "topic": "Understanding complete business feasibility report: Market, Technical, Financial, Legal Feasibility"
    },
    {
      "week_number": 12,
      "topic": "Financing Entrepreneurial Ventures: Seed Capital, Venture Capital, Angel Investors, Crowd-funding"
    },
    {
      "week_number": 13,
      "topic": "External Sources of Growth: Joint venture, Acquisition, Mergers and Franchising"
    },
    {
      "week_number": 14,
      "topic": "Case studies of successful entrepreneurs in national and international markets"
    },
    {
      "week_number": 15,
      "topic": "Managing growth, SME policies, Government regulations and SMEDA guidelines"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA7143": {
  "code": "BUSA 7143",
  "title": "HR Practices in Corporations",
  "credit_hours": "3(3+0)",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to Human Resource Management: Strategic HRM in Corporations"
    },
    {
      "week_number": 2,
      "topic": "Human Resource Planning: Demand and Supply Forecasting, Succession Planning"
    },
    {
      "week_number": 3,
      "topic": "Job Analysis and Design: Job Description, Job Specification, Job Enrichment and Rotation"
    },
    {
      "week_number": 4,
      "topic": "Employee Recruitment and Selection: Sourcing Strategies, Screening, Testing, Interviewing"
    },
    {
      "week_number": 5,
      "topic": "Employee Orientation and Socialization: Organizational Culture Integration"
    },
    {
      "week_number": 6,
      "topic": "Employee Training and Development: Training Needs Assessment (TNA), Training Methods, ROI"
    },
    {
      "week_number": 7,
      "topic": "Organizational Development (OD) and Managing Organizational Change"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Performance Appraisal and Management: 360-Degree Feedback, KPIs, MBO, Appraisal Bias"
    },
    {
      "week_number": 10,
      "topic": "Compensation and Benefits: Base Pay, Incentive Plans, Executive Compensation, Statutory Benefits"
    },
    {
      "week_number": 11,
      "topic": "Labor Unions, Collective Bargaining, Industrial Disputes and Labor Laws in Pakistan"
    },
    {
      "week_number": 12,
      "topic": "Conflict and Negotiations: Workplace Conflict Resolution, Grievance Handling Procedures"
    },
    {
      "week_number": 13,
      "topic": "Employee health, safety, well-being, work-life balance and Stress Management"
    },
    {
      "week_number": 14,
      "topic": "Role of technology in HRM: HRIS, HR Analytics, AI in Recruitment and Talent Management"
    },
    {
      "week_number": 15,
      "topic": "Emerging Challenges in HRM, Diversity Management and Islamic perspective of HRM"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA7144": {
  "code": "BUSA 7144",
  "title": "Concepts in Operations Management",
  "credit_hours": "3(3+0)",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Operations and Productivity: Role of Operations, Goods vs Services, Productivity Measurement"
    },
    {
      "week_number": 2,
      "topic": "Operations Strategy in Global Environment: Developing Missions and Strategies, Competitive Advantage"
    },
    {
      "week_number": 3,
      "topic": "Forecasting: Qualitative and Quantitative Forecasting Models, Time Series, Error Measurement"
    },
    {
      "week_number": 4,
      "topic": "Design of Goods and Services: Product Life Cycle, Quality Function Deployment (QFD), Taguchi Methods"
    },
    {
      "week_number": 5,
      "topic": "Process Strategy and Capacity Planning: Process Types, Crossover Charts, Break-Even Analysis"
    },
    {
      "week_number": 6,
      "topic": "Location Strategies: Factor-Rating Method, Locational Cost-Volume Analysis, Center of Gravity"
    },
    {
      "week_number": 7,
      "topic": "Layout Strategies: Office, Retail, Warehouse and Process-Oriented Layouts, Assembly-Line Balancing"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Supply Chain Management: Strategic Fit, Sourcing Strategies, Supplier Evaluation and Selection"
    },
    {
      "week_number": 10,
      "topic": "SC: Achieving Strategic Fit and Scope, Supply Chain Drivers and Performance Metrics"
    },
    {
      "week_number": 11,
      "topic": "Network Design in the Supply Chain: Distribution Networks, E-Commerce and Global Logistics"
    },
    {
      "week_number": 12,
      "topic": "Managing Risk in the Supply Chain: Vulnerabilities, Disruptions, Resilience and Mitigation"
    },
    {
      "week_number": 13,
      "topic": "Inventory Management: Independent Demand Models, EOQ, Quantity Discount Models, Safety Stocks"
    },
    {
      "week_number": 14,
      "topic": "Material Requirements Planning (MRP) and Enterprise Resource Planning (ERP)"
    },
    {
      "week_number": 15,
      "topic": "Just-In-Time (JIT), Lean Operations, Total Quality Management (TQM) and Six Sigma"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA7145": {
  "code": "BUSA 7145",
  "title": "Managerial Finance",
  "credit_hours": "3(3+0)",
  "weeks": [
    {
      "week_number": 1,
      "topic": "An Overview of Managerial Finance: Scope, Goals of Firm, Agency Problem and Corporate Governance"
    },
    {
      "week_number": 2,
      "topic": "The Business, Tax and Financial Environment: Financial Institutions, Capital Markets, Tax Impacts"
    },
    {
      "week_number": 3,
      "topic": "Analysis of Financial Statements: Ratio Analysis, DuPont System, Benchmarking Financial Health"
    },
    {
      "week_number": 4,
      "topic": "Time Value of Money: Future Value, Present Value, Ordinary Annuities, Annuities Due, Perpetuities"
    },
    {
      "week_number": 5,
      "topic": "Discounted Cash flow Valuation: Compounding Frequencies, Effective Annual Rate (EAR), Loan Amortization"
    },
    {
      "week_number": 6,
      "topic": "Long term securities and their valuation: Bond Characteristics, Bond Valuation Models, Yield to Maturity"
    },
    {
      "week_number": 7,
      "topic": "Stock Valuation: Common and Preferred Stocks, Zero Growth, Constant Growth, Multi-stage Growth Models"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Capital Budgeting Techniques: Net Present Value (NPV), Internal Rate of Return (IRR), Payback Period"
    },
    {
      "week_number": 10,
      "topic": "Cash Flow Estimation: Relevant Cash Flows, Incremental Cash Flows, Sunk Costs, Opportunity Costs"
    },
    {
      "week_number": 11,
      "topic": "Risk and Return: Expected Return, Standard Deviation, Portfolio Risk, Capital Asset Pricing Model (CAPM)"
    },
    {
      "week_number": 12,
      "topic": "Cost of Capital: Cost of Debt, Preferred Stock, Equity, Weighted Average Cost of Capital (WACC)"
    },
    {
      "week_number": 13,
      "topic": "Leverage and Capital Structure: Operating and Financial Leverage, EBIT-EPS Analysis, Modigliani-Miller"
    },
    {
      "week_number": 14,
      "topic": "Dividend Policy: Payout Policies, Dividends vs Share Repurchases, Factors Affecting Dividend Decisions"
    },
    {
      "week_number": 15,
      "topic": "Working Capital Management: Cash, Marketable Securities, Accounts Receivable and Inventory Policies"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA7146": {
  "code": "BUSA 7146",
  "title": "Applied Managerial Economics",
  "credit_hours": "3(3+0)",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Nature, Scope and Overview of Managerial Economics: Decision Making Framework for Managers"
    },
    {
      "week_number": 2,
      "topic": "Economic Optimization: Marginal Analysis, Net Present Value Optimization, Profit Maximization"
    },
    {
      "week_number": 3,
      "topic": "Market Forces: Demand Analysis, Estimation and Forecasting, Elasticity Concepts and Business Pricing"
    },
    {
      "week_number": 4,
      "topic": "Empirical Demand Estimation: Regression Analysis, Identification Problem, Interview and Survey Methods"
    },
    {
      "week_number": 5,
      "topic": "Production Theory and Estimation: Total, Average and Marginal Product, Isoquants, Cost Minimization"
    },
    {
      "week_number": 6,
      "topic": "Production and Cost: Short-run and Long-run Cost Curves, Economies of Scale and Scope"
    },
    {
      "week_number": 7,
      "topic": "Pricing Analysis and Market Structure: Perfect Competition, Monopoly, Monopolistic Competition"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Oligopoly Markets: Cournot, Bertrand, Sweezy Kinked Demand, Cartels and Collusion"
    },
    {
      "week_number": 10,
      "topic": "Game Theory and Strategic Business Decisions: Nash Equilibrium, Prisoner's Dilemma, Dominant Strategies"
    },
    {
      "week_number": 11,
      "topic": "Pricing Strategies: Price Discrimination (1st, 2nd, 3rd Degree), Two-Part Tariffs, Bundling, Peak-Load"
    },
    {
      "week_number": 12,
      "topic": "Linear Programming: Graphical and Simplex Formulation, Shadow Prices, Constrained Optimization"
    },
    {
      "week_number": 13,
      "topic": "Risk and Uncertainty: Expected Value, Variance, Utility Theory, Risk Aversion and Certainty Equivalents"
    },
    {
      "week_number": 14,
      "topic": "Asymmetric Information: Adverse Selection, Moral Hazard, Principal-Agent Problems in Business"
    },
    {
      "week_number": 15,
      "topic": "Government Regulation, Antitrust Policies and Business Strategy in Public Sector"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA7147": {
  "code": "BUSA 7147",
  "title": "Research Methods & Data Analysis",
  "credit_hours": "3(3+0)",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to Business Research: Scientific Investigation, Managerial Value of Research"
    },
    {
      "week_number": 2,
      "topic": "Research and Managerial Process: Problem Definition, Scoping and Research Questions"
    },
    {
      "week_number": 3,
      "topic": "Developing a Research Proposal: Structure, Budgeting, Ethical Clearance, Timeline"
    },
    {
      "week_number": 4,
      "topic": "Literature Survey and Review: Critical Reading, Synthesis, Identifying Research Gaps"
    },
    {
      "week_number": 5,
      "topic": "Academic writing and argument building, Plagiarism and Ethics in Research, Citation Styles"
    },
    {
      "week_number": 6,
      "topic": "Establishing research framework: Theoretical Foundations, Variables, Hypotheses Formulation"
    },
    {
      "week_number": 7,
      "topic": "Philosophical assumptions in business research (Positivism, Interpretivism, Pragmatism)"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Measurement and Scaling: Operationalization, Nominal, Ordinal, Interval, Ratio Scales, Likert Scale"
    },
    {
      "week_number": 10,
      "topic": "Scale development, questionnaire design, Reliability and Construct Validity"
    },
    {
      "week_number": 11,
      "topic": "Sample and sampling techniques: Probability and Non-Probability Sampling, Sample Size Determination"
    },
    {
      "week_number": 12,
      "topic": "Data Collection and Preparation: Data Cleaning, Missing Data Imputation, Screening Outliers"
    },
    {
      "week_number": 13,
      "topic": "Estimation and Hypothesis Testing, Correlation, Multiple Regression Analysis, Multicollinearity"
    },
    {
      "week_number": 14,
      "topic": "Time Series and Panel Data Analysis Basics: Unit Roots, Cointegration, Fixed/Random Effects"
    },
    {
      "week_number": 15,
      "topic": "Introduction to statistical softwares: SPSS, SmartPLS (SEM), AMOS, Interpreting Output Reports"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA7148": {
  "code": "BUSA 7148",
  "title": "Business Strategy & Policy",
  "credit_hours": "3(3+0)",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Strategic management process: Foundations, Strategic Vision, Mission, Objectives"
    },
    {
      "week_number": 2,
      "topic": "Mintzberg's 10 schools of strategy, Strategic Thinking vs Strategic Planning"
    },
    {
      "week_number": 3,
      "topic": "Business vision and mission, Corporate Governance, Corporate Social Responsibility & Sustainability"
    },
    {
      "week_number": 4,
      "topic": "Scanning the external environment: Remote, Industry, Operating Environment, PESTEL Analysis"
    },
    {
      "week_number": 5,
      "topic": "Industry Analysis: Porter's Five Forces Model, Strategic Groups, Competitive Intelligence"
    },
    {
      "week_number": 6,
      "topic": "Scanning the internal environment: Resource-Based View (RBV), VRIO Framework, Value Chain Analysis"
    },
    {
      "week_number": 7,
      "topic": "SWOT analysis, TOWS Matrix, Internal-External (IE) Matrix, Grand Strategy Matrix"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Corporate strategies: Growth, Stability, Retrenchment, Diversification (Related vs Unrelated)"
    },
    {
      "week_number": 10,
      "topic": "Portfolio Analysis: BCG Matrix, GE-McKinsey Matrix, Multi-business Strategy Formulation"
    },
    {
      "week_number": 11,
      "topic": "Business strategies: Cost Leadership, Differentiation, Focus, Blue Ocean Strategy"
    },
    {
      "week_number": 12,
      "topic": "Functional strategies: Alignment of R&D, Operations, HR, Finance and Marketing Strategies"
    },
    {
      "week_number": 13,
      "topic": "Strategy implementation: Structure, Resource Allocation, Leadership, Change Management"
    },
    {
      "week_number": 14,
      "topic": "Strategy evaluation and control: Balanced Scorecard, Performance Metrics, Benchmarking"
    },
    {
      "week_number": 15,
      "topic": "Comprehensive Case analysis: Real-world Corporate Strategic Turnaround and Failure Cases"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA7149": {
  "code": "BUSA 7149",
  "title": "Essentials of Strategic Marketing",
  "credit_hours": "3(3+0)",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to Strategic Marketing: Marketing as a Strategic Driver and Business Philosophy"
    },
    {
      "week_number": 2,
      "topic": "A review of strategic management process and its integration with marketing programs"
    },
    {
      "week_number": 3,
      "topic": "Marketing research and strategic information systems, Marketing Intelligence Systems"
    },
    {
      "week_number": 4,
      "topic": "Market analysis and Situation analysis: Market Dynamics, Customer Drivers, PESTEL in Marketing"
    },
    {
      "week_number": 5,
      "topic": "Competitor analysis: Identifying Competitor Strategies, Objectives, Strengths and Vulnerabilities"
    },
    {
      "week_number": 6,
      "topic": "Sustainable Competitive Advantage (SCA): Sources of Advantage, Core Competencies, Defensive Strategies"
    },
    {
      "week_number": 7,
      "topic": "Consumer behavior and customer analysis, Customer Relationship Management (CRM) & Lifetime Value (CLV)"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Segmentation and target market selection: Advanced Behavioral and Benefit Segmentation"
    },
    {
      "week_number": 10,
      "topic": "Positioning Strategies: Perceptual Mapping, Re-positioning, Brand Architecture and Portfolio Management"
    },
    {
      "week_number": 11,
      "topic": "Marketing mix strategies: Product & Brand Strategy, Managing Global and Corporate Brands"
    },
    {
      "week_number": 12,
      "topic": "Strategic Pricing strategies: Value-Based Pricing, Competitive Pricing, Dynamic and Digital Pricing"
    },
    {
      "week_number": 13,
      "topic": "Strategic Distribution channels: Omni-channel Retailing, Channel Alignment and Conflict Management"
    },
    {
      "week_number": 14,
      "topic": "Strategic Marketing communication: Digital Marketing Integration, Social Media Strategy, PR"
    },
    {
      "week_number": 15,
      "topic": "Strategy implementation, evaluation and control: Marketing Metrics, Marketing Audit, ROI Assessment"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA7150": {
  "code": "BUSA 7150",
  "title": "Essentials of Strategic Finance",
  "credit_hours": "3(3+0)",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Overview of strategic financial management and development of the theory of corporate finance"
    },
    {
      "week_number": 2,
      "topic": "Implications of economic, legal and social environment on strategic financial management function"
    },
    {
      "week_number": 3,
      "topic": "Foundations of Corporate Finance Theory applied to Corporate Decisions"
    },
    {
      "week_number": 4,
      "topic": "Concepts of Capital Structure: Theories of Capital Structure, Modigliani-Miller Propositions, Trade-Off Theory"
    },
    {
      "week_number": 5,
      "topic": "Leverage and its types: Operating Leverage, Financial Leverage, Combined Leverage and Risk"
    },
    {
      "week_number": 6,
      "topic": "Working Capital Policy: Conservative, Aggressive and Moderate Policies, Liquidity Management"
    },
    {
      "week_number": 7,
      "topic": "Cash Conversion Cycle: Operating Cycle Analysis, Cash Acceleration and Disbursement Control"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Strategic Inventory and Accounts Receivable Management, Credit Policy and Credit Terms Formulation"
    },
    {
      "week_number": 10,
      "topic": "Accounts Payable Management and Short-Term Financing Strategies"
    },
    {
      "week_number": 11,
      "topic": "Valuation of Securities: Discounted Cash Flow (DCF), Relative Valuation, Multiples, Asset-Based Valuation"
    },
    {
      "week_number": 12,
      "topic": "Valuation and Financial Strategies for Take-Over, Acquisition, Mergers and Corporate Restructuring"
    },
    {
      "week_number": 13,
      "topic": "Understanding differences between conventional and Islamic finance paradigms"
    },
    {
      "week_number": 14,
      "topic": "Evaluation of Long-term Investment Projects: Real Options, Scenario and Sensitivity Analysis"
    },
    {
      "week_number": 15,
      "topic": "Dividend Payout Policy, Economic Crises Analysis and Corrective Strategic Financial Measures"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA7151": {
  "code": "BUSA 7151",
  "title": "Management Research Project",
  "credit_hours": "3(0+3)",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to Management Research Project: Scoping, Guidelines, Approval of Supervisor and Topic"
    },
    {
      "week_number": 2,
      "topic": "Formulation of Research Problem Statement, Objectives, and Research Questions"
    },
    {
      "week_number": 3,
      "topic": "Comprehensive Literature Survey: Review of Relevant Academic Papers and Industry Benchmarks"
    },
    {
      "week_number": 4,
      "topic": "Development of Theoretical / Conceptual Framework and Hypotheses / Research Model"
    },
    {
      "week_number": 5,
      "topic": "Research Methodology Formulation: Research Design, Population, Sample and Sampling Technique"
    },
    {
      "week_number": 6,
      "topic": "Design and Pre-Testing of Data Collection Instruments (Questionnaire, Interview Schedule, Archival Data)"
    },
    {
      "week_number": 7,
      "topic": "Data Collection Process: Field Survey, Secondary Database Compilation and Documentation"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION / PROGRESS EVALUATION"
    },
    {
      "week_number": 9,
      "topic": "Data Screening, Cleaning, Coding and Preliminary Descriptive Statistics"
    },
    {
      "week_number": 10,
      "topic": "Empirical Data Analysis: Inferential Statistics, Correlation, Regression, SEM or Qualitative Content Analysis"
    },
    {
      "week_number": 11,
      "topic": "Interpretation of Research Findings in Light of Literature and Research Questions"
    },
    {
      "week_number": 12,
      "topic": "Managerial Implications, Recommendations and Practical Applications for Industry"
    },
    {
      "week_number": 13,
      "topic": "Drafting the Complete Management Research Report: Preliminary Pages, Chapters, References (APA)"
    },
    {
      "week_number": 14,
      "topic": "Review of Draft with Supervisor, Revisions, Proofreading and Plagiarism Clearance"
    },
    {
      "week_number": 15,
      "topic": "Final Project Submission, Presentation Preparations, Mock Viva and Departmental Evaluation"
    },
    {
      "week_number": 16,
      "topic": "FINAL PROJECT DEFENSE / VIVA VOCE EXAMINATION"
    }
  ]
}
,
  "COMP1117": {
  "code": "COMP1117",
  "title": "Foundations of Artificial Intelligence",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to AI: Concept, History, Evolution & Types of AI (Narrow, General, Super AI)"
    },
    {
      "week_number": 2,
      "topic": "Exploring AI Around Us: Mobile & Web AI Systems, Real-World AI Applications"
    },
    {
      "week_number": 3,
      "topic": "Foundations of Machine Learning: Supervised, Unsupervised & Reinforcement Learning"
    },
    {
      "week_number": 4,
      "topic": "Data Collection, Preparation & Visualization for AI Systems"
    },
    {
      "week_number": 5,
      "topic": "No-Code AI & Image Classification using Google Teachable Machine & Microsoft Lobe"
    },
    {
      "week_number": 6,
      "topic": "Audio & Pose Recognition AI Systems: Model Training & Evaluation"
    },
    {
      "week_number": 7,
      "topic": "Computer Vision & Object Detection with Low-Code AI Tools"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Large Language Models (LLMs) & Prompt Engineering: ChatGPT, Claude, Gemini"
    },
    {
      "week_number": 10,
      "topic": "Generative AI for Content Creation: Images, Text, Video (DALL-E, Canva AI, RunwayML)"
    },
    {
      "week_number": 11,
      "topic": "AI-Powered Research & Productivity Tools: Workflow Optimization"
    },
    {
      "week_number": 12,
      "topic": "AI Ethics & Social Impacts: Bias, Fairness, Data Privacy, Transparency & Responsible AI"
    },
    {
      "week_number": 13,
      "topic": "Discipline-Specific AI Applications: Business Analytics, Customer Insights & Predictive Models"
    },
    {
      "week_number": 14,
      "topic": "Mini Interdisciplinary AI Project: Ideation, Proposal & Architecture"
    },
    {
      "week_number": 15,
      "topic": "Mini AI Project Implementation, Testing, Validation & Showcase"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "COMP2121": {
  "code": "COMP2121",
  "title": "Artificial Intelligence",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to Artificial Intelligence & Knowledge-Based Systems"
    },
    {
      "week_number": 2,
      "topic": "Python Programming Foundations for AI & Data Manipulation"
    },
    {
      "week_number": 3,
      "topic": "Reasoning and Knowledge Representation: Syntax, Semantics & Rules"
    },
    {
      "week_number": 4,
      "topic": "Problem Solving by Searching: Uninformed Search (BFS, DFS, Uniform Cost)"
    },
    {
      "week_number": 5,
      "topic": "Informed & Heuristic Search: A*, Greedy Best-First & Local Search"
    },
    {
      "week_number": 6,
      "topic": "Adversarial Search & Game Playing: Min-Max Algorithm, Alpha-Beta Pruning"
    },
    {
      "week_number": 7,
      "topic": "Case Studies in AI: General Problem Solver, Eliza, Natural Language Parsing"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Machine Learning from Examples: Inductive Learning & Decision Trees"
    },
    {
      "week_number": 10,
      "topic": "Artificial Neural Networks (ANN): Perceptrons, Multi-Layer & Backpropagation"
    },
    {
      "week_number": 11,
      "topic": "Natural Language Processing (NLP): Tokenization, POS Tagging & Sentiment Analysis"
    },
    {
      "week_number": 12,
      "topic": "Pattern Matching & Symbolic Manipulation in Python"
    },
    {
      "week_number": 13,
      "topic": "Recent Trends in AI & Big Data Integration"
    },
    {
      "week_number": 14,
      "topic": "Practical Applications of AI Algorithms in Business Decision Systems"
    },
    {
      "week_number": 15,
      "topic": "Comprehensive AI Project Development & Evaluation"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA2119": {
  "code": "BUSA2119",
  "title": "Introduction to Business Analytics",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Overview of the Course, Introduction to Business Analytics: Role of Data in; Management Decision-Making"
    },
    {
      "week_number": 2,
      "topic": "Using Business Analytics to Address Business Questions, Frameworks and; Techniques of Business Analytics"
    },
    {
      "week_number": 3,
      "topic": "Introduction to Business Data Sources: Types and Applications, Challenges in; Gathering, Analyzing, and Managing Data"
    },
    {
      "week_number": 4,
      "topic": "Basic Statistics for Business Analytics, Tools Required for Statistical Analysis"
    },
    {
      "week_number": 5,
      "topic": "Exploratory Business Analytics: Descriptive Analytics, Diagnostic Analytics and; Business Contexts"
    },
    {
      "week_number": 6,
      "topic": "Confirmatory Business Analytics: Predictive Analytics, Prescriptive Analytics and; Applications"
    },
    {
      "week_number": 7,
      "topic": "Introduction to Data Visualization: Importance and Key Concepts, Tools for Data; Visualization (Power BI and SAS Visual Analytics)"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Designing Visual Reports for Business Contexts, Communicating Insights through; Visual Analytics"
    },
    {
      "week_number": 10,
      "topic": "Marketing Analytics: Techniques and Applications, Real-World Applications of; Marketing Analytics"
    },
    {
      "week_number": 11,
      "topic": "Accounting Analytics: Key Metrics and Visualization, Challenges in Accounting; Data Analysis"
    },
    {
      "week_number": 12,
      "topic": "Financial Analytics: Tools and Decision-Making, Use Cases in Financial Analysis"
    },
    {
      "week_number": 13,
      "topic": "Operations Analytics: Techniques for Process Optimization, Applications of Data; Analytics in Operations"
    },
    {
      "week_number": 14,
      "topic": "Advanced Business Analytics Techniques, Case Studies of Industry Applications"
    },
    {
      "week_number": 15,
      "topic": "SOAR Analytics Model: Introduction and Implementation, Researching Global; Trends in Business Analytics"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA3130": {
  "code": "BUSA3130",
  "title": "Foundation of Data Science",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to Data Science: Big Data, Datafication, and the Current Landscape of Opportunities"
    },
    {
      "week_number": 2,
      "topic": "Skill Sets for Data Science Professionals: Problem-Solving, Statistical Inference, and Data; Handling"
    },
    {
      "week_number": 3,
      "topic": "Introduction to Python Programming: Basics, Libraries (NumPy, Pandas), and Data Manipulation"
    },
    {
      "week_number": 4,
      "topic": "Exploratory Data Analysis (EDA): Descriptive Statistics, Visualization Techniques, and Insights"
    },
    {
      "week_number": 5,
      "topic": "Fundamentals of Machine Learning: Supervised vs. Unsupervised Learning, Linear Regression"
    },
    {
      "week_number": 6,
      "topic": "Classification and Clustering: k-Nearest Neighbors (k-NN), k-Means, and Decision Trees"
    },
    {
      "week_number": 7,
      "topic": "Feature Engineering: Feature Generation, Feature Selection, and Best Practices"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Dimensionality Reduction: Principal Component Analysis (PCA) and Singular Value; Decomposition (SVD)"
    },
    {
      "week_number": 10,
      "topic": "Mining Social Network Graphs: Graph Representation, Clustering, and Community Detection"
    },
    {
      "week_number": 11,
      "topic": "Advanced Visualization Techniques: Interactive Visualizations with Matplotlib, Seaborn, and"
    },
    {
      "week_number": 12,
      "topic": "Ethical Considerations in Data Science: Privacy, Security, and Fairness in AI"
    },
    {
      "week_number": 13,
      "topic": "Practical Case Studies in Data Science: Applying Skills to Real-World Problems"
    },
    {
      "week_number": 14,
      "topic": "Emerging Trends: AI-Driven Data Analytics, AutoML, and Responsible AI Practices"
    },
    {
      "week_number": 15,
      "topic": "Project Work: Building a Data Science Solution (Group Assignments and Presentations)"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA3131": {
  "code": "BUSA3131",
  "title": "Programming with R/Python",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to Programming in R and Python; Overview of RStudio and Jupyter Notebooks, Installing Packages, Writing and Running"
    },
    {
      "week_number": 2,
      "topic": "Data Structures in R and Python; Understanding Vectors, Lists, Matrices, DataFrames, Dictionaries, and Arrays"
    },
    {
      "week_number": 3,
      "topic": "Data Import and Export; Reading and Writing CSV, Excel, and JSON Files; Using APIs to Extract Data"
    },
    {
      "week_number": 4,
      "topic": "Data Wrangling; Data Cleaning, Handling Missing Values, Merging Datasets, and Reshaping Data Using; pandas (Python) and tidyr/dplyr (R)"
    },
    {
      "week_number": 5,
      "topic": "Data Visualization; Creating Basic and Advanced Plots Using ggplot2 (R) and Matplotlib/Seaborn (Python),; Interactive Dashboards with Plotly"
    },
    {
      "week_number": 6,
      "topic": "Exploratory Data Analysis (EDA); Summary Statistics, Detecting Outliers, and Identifying Patterns"
    },
    {
      "week_number": 7,
      "topic": "Introduction to Machine Learning; Overview of Supervised and Unsupervised Learning, Linear Regression, and k-Means"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Building Predictive Models; Logistic Regression, Decision Trees, and Random Forests"
    },
    {
      "week_number": 10,
      "topic": "Time Series Analysis; Understanding Time Series Data, Forecasting with ARIMA and Prophet"
    },
    {
      "week_number": 11,
      "topic": "Automating Workflows; Writing Scripts to Automate Tasks, Scheduling Jobs with cron and task schedulers"
    },
    {
      "week_number": 12,
      "topic": "Advanced Topics in R and Python"
    },
    {
      "week_number": 13,
      "topic": "Working with Big Data; Using Spark with Python (PySpark), Large-Scale Data Manipulation in R"
    },
    {
      "week_number": 14,
      "topic": "Case Studies in Analytics; Applications in Marketing, Finance, and Operations"
    },
    {
      "week_number": 15,
      "topic": "Ethical Considerations in Programming and Analytics; Data Privacy, Algorithm Bias, and Transparent Reporting"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA3132": {
  "code": "BUSA3132",
  "title": "Digital Transformation in Business Organizations",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to Digital Transformation; Definition, Importance, and Key Drivers of Digital Transformation; Overview of Digital"
    },
    {
      "week_number": 2,
      "topic": "The Digital Economy and its Impact on Business; Understanding Digital Business Models, Global Trends, and the Role of Data in Digital"
    },
    {
      "week_number": 3,
      "topic": "Emerging Technologies in Digital Transformation; Overview of Artificial Intelligence (AI), Internet of Things (IoT), Blockchain, and Cloud"
    },
    {
      "week_number": 4,
      "topic": "Customer-Centric Digital Transformation; Enhancing Customer Experiences with Digital Tools, Personalization, and Omnichannel"
    },
    {
      "week_number": 5,
      "topic": "Process Automation and Efficiency; Implementing Robotic Process Automation (RPA), Workflow Optimization, and Operational"
    },
    {
      "week_number": 6,
      "topic": "Digital Transformation Strategy; Developing and Aligning Digital Strategies with Organizational Goals, KPIs for Measuring"
    },
    {
      "week_number": 7,
      "topic": "Change Management in Digital Transformation; Principles of Change Management, Employee Engagement, and Overcoming Resistance to"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Leadership in Digital Transformation; Developing Digital Leadership Skills, Building Collaborative and Innovative Cultures"
    },
    {
      "week_number": 10,
      "topic": "Data-Driven Decision-Making; Leveraging Big Data Analytics, Predictive Models, and Real-Time Insights"
    },
    {
      "week_number": 11,
      "topic": "Cybersecurity in the Digital Age; Understanding Cyber Risks, Data Protection, and Building Resilient Digital Systems"
    },
    {
      "week_number": 12,
      "topic": "Sustainability and Ethics in Digital Transformation; Social and Environmental Impacts, Digital Inclusion, and Responsible Technology Adoption"
    },
    {
      "week_number": 13,
      "topic": "Industry-Specific Applications of Digital Transformation; Case Studies in Healthcare, Retail, Manufacturing, and Financial Services"
    },
    {
      "week_number": 14,
      "topic": "Challenges in Digital Transformation; Barriers to Adoption, Technology Integration Issues, and Legacy Systems"
    },
    {
      "week_number": 15,
      "topic": "Future of Digital Transformation; Trends Shaping the Future: AI-Driven Transformation, Quantum Computing, and Beyond"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA3133": {
  "code": "BUSA3133",
  "title": "Data Mining for Business Applications",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to Data Mining and Warehousing; Overview of Data Mining, Evolution of Data Warehousing, Managerial Applications"
    },
    {
      "week_number": 2,
      "topic": "Data Mining Process; Steps in the Data Mining Process, Understanding the Role of Data Preparation, Data; Preprocessing Techniques"
    },
    {
      "week_number": 3,
      "topic": "Fundamentals of Data Warehousing; Data Warehousing Concepts, Dimensional Modeling, Technical Architecture, Physical"
    },
    {
      "week_number": 4,
      "topic": "Data Mining Techniques – Pattern Discovery; Association Rule Mining, Frequent Pattern Analysis, Apriori Algorithm"
    },
    {
      "week_number": 5,
      "topic": "Data Mining Techniques – Cluster Analysis; Introduction to Clustering, K-Means Algorithm, Hierarchical Clustering"
    },
    {
      "week_number": 6,
      "topic": "Data Mining Algorithms – Classification; Decision Trees, Naive Bayes Classifier, Neural Networks Basics"
    },
    {
      "week_number": 7,
      "topic": "Data Warehousing Implementation; Project Planning, Business Requirements Definition, Product Selection"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Data Mining and Business Intelligence; Role of Data Mining in Business Intelligence, Linking Data Mining to Decision Support"
    },
    {
      "week_number": 10,
      "topic": "Advanced Topics in Data Mining; Data Visualization in Data Mining, Data Mining on Distributed and Streaming Data"
    },
    {
      "week_number": 11,
      "topic": "Real-Life Applications of Data Mining; Case Studies in Fraud Detection, Credit Scoring, Customer Relationship Management"
    },
    {
      "week_number": 12,
      "topic": "Practical Exercises and Experiments; Hands-on Experiments Using Test Data, Data Mining Software Applications (e.g., Weka,"
    },
    {
      "week_number": 13,
      "topic": "Dimensional Modeling and Database Design; Physical Database Design, Data Staging Process and Techniques"
    },
    {
      "week_number": 14,
      "topic": "Data Mining Challenges and Ethical Considerations; Data Privacy, Data Security, Ethical Use of Data"
    },
    {
      "week_number": 15,
      "topic": "Research in Data Mining; Exploration of Data Mining Techniques for Research, Review of Data Mining Literature"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA4159": {
  "code": "BUSA4159",
  "title": "Data Visualization",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to Data Visualization; Students will explore the principles of data visualization, including its importance in"
    },
    {
      "week_number": 2,
      "topic": "Introduction to Power BI; This week focuses on understanding Power BI’s interface, connecting to data sources, and"
    },
    {
      "week_number": 3,
      "topic": "Introduction to Tableau; Students will learn the basics of Tableau, including its interface, connecting to data sources,"
    },
    {
      "week_number": 4,
      "topic": "Data Preparation and Cleaning; This week covers data preparation and transformation techniques using Power BI’s Power"
    },
    {
      "week_number": 5,
      "topic": "Creating Effective Visualizations; Students will explore different types of visualizations, including bar charts, scatter plots, line"
    },
    {
      "week_number": 6,
      "topic": "Advanced Visualization Techniques; This week delves into advanced visualizations like treemaps, waterfall charts, and"
    },
    {
      "week_number": 7,
      "topic": "Interactive Dashboards in Power BI; Students will design and create interactive dashboards using Power BI. Topics include using"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Interactive Dashboards in Tableau; This week focuses on creating interactive dashboards in Tableau. Topics include using"
    },
    {
      "week_number": 10,
      "topic": "Storytelling with Data; Students will learn storytelling techniques to communicate insights effectively. Topics"
    },
    {
      "week_number": 11,
      "topic": "Advanced Power BI Features; This week covers advanced Power BI features, including DAX (Data Analysis Expressions),"
    },
    {
      "week_number": 12,
      "topic": "Advanced Tableau Features; Students will explore advanced Tableau features, such as calculated fields, table; calculations, and level of detail (LOD) expressions. These features enable more precise and"
    },
    {
      "week_number": 13,
      "topic": "Data Visualization for Specific Domains; This week focuses on domain-specific visualization applications, such as sales, marketing,"
    },
    {
      "week_number": 14,
      "topic": "Performance Optimization in Power BI and Tableau; Students will learn techniques to optimize dashboard performance, including data source"
    },
    {
      "week_number": 15,
      "topic": "Capstone Project Development; Students will work on a capstone project to design an end-to-end visualization solution using"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA3134": {
  "code": "BUSA3134",
  "title": "Enterprise Systems and Process Integration",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to ERP Systems; The Role of Information, Information Culture, Information Silos, and ERP Fundamentals"
    },
    {
      "week_number": 2,
      "topic": "Business Functions and ERP Integration; Overview of Business Processes, IT and Productivity, Emergence of ERP Software"
    },
    {
      "week_number": 3,
      "topic": "ERP for Midsized Companies; FAQs About ERP Systems, Integration of Sales, Marketing, and Accounting"
    },
    {
      "week_number": 4,
      "topic": "Customer Relationship Management (CRM) and Sales Process; Pre-Sales Activities, Order Management, Sales Forecasting, and Operations Planning"
    },
    {
      "week_number": 5,
      "topic": "Materials Management and Procurement Process (Part 1); Material Requirements Planning, Inventory Management, and Supplier Collaboration"
    },
    {
      "week_number": 6,
      "topic": "Materials Management and Procurement Process (Part 2); Procurement Process Lifecycle, ERP and Supply Chain Integration"
    },
    {
      "week_number": 7,
      "topic": "Human Resource Management (HRM) Module; Recruitment, Interviewing and Hiring, Performance Management, and Training"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Accounting and Financial Reporting in ERP; ERP’s Role in Financial Reporting, Process Modeling, and Flowcharts"
    },
    {
      "week_number": 10,
      "topic": "Process Improvement with ERP; EPC Diagrams, Workflow Tools, and Evaluating Process Improvements"
    },
    {
      "week_number": 11,
      "topic": "ERP Implementation Strategies; Enterprise System Architecture, System Development Lifecycle (SDLC), and Change"
    },
    {
      "week_number": 12,
      "topic": "ERP Implementation Challenges; High-Level ERP Purchase Process, Project Planning, and Risk Mitigation"
    },
    {
      "week_number": 13,
      "topic": "Advanced ERP Concepts; Mobile Computing, RFID Integration, Virtualization, and Cloud-Based ERP"
    },
    {
      "week_number": 14,
      "topic": "Business Intelligence (BI) and SaaS in ERP Systems; BI for Decision-Making, SaaS ERP Solutions, and Future Trends"
    },
    {
      "week_number": 15,
      "topic": "Case Studies in ERP Adoption; Real-World Applications of ERP in Industries like Manufacturing, Retail, and Healthcare"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA4160": {
  "code": "BUSA4160",
  "title": "Business Analytics Capstone Project",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to the Analytics Project"
    },
    {
      "week_number": 2,
      "topic": "Problem Identification and Data Understanding"
    },
    {
      "week_number": 3,
      "topic": "Problem Identification and Data Understanding"
    },
    {
      "week_number": 4,
      "topic": "Data Collection and Preprocessing"
    },
    {
      "week_number": 5,
      "topic": "Data Collection and Preprocessing"
    },
    {
      "week_number": 6,
      "topic": "Exploratory Data Analysis (EDA)"
    },
    {
      "week_number": 7,
      "topic": "Exploratory Data Analysis (EDA)"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Predictive Modeling"
    },
    {
      "week_number": 10,
      "topic": "Prescriptive Analytics and Optimization"
    },
    {
      "week_number": 11,
      "topic": "Advanced Visualization and Reporting"
    },
    {
      "week_number": 12,
      "topic": "Implementation Plan and Business Impact"
    },
    {
      "week_number": 13,
      "topic": "Documentation and Report Preparation"
    },
    {
      "week_number": 14,
      "topic": "Presentation Skills and Stakeholder Engagement"
    },
    {
      "week_number": 15,
      "topic": "Final Project Submission and Presentations"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA4161": {
  "code": "BUSA4161",
  "title": "Freelancing Management",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Career Development Theories and Conducting Career Research: Understanding; career paths, setting realistic goals, and analyzing industry opportunities."
    },
    {
      "week_number": 2,
      "topic": "Networking and Networking Tools: Building authentic relationships, leveraging; platforms like LinkedIn, and creating professional e-portfolios."
    },
    {
      "week_number": 3,
      "topic": "Conducting a Targeted Job Search: Crafting resumes and cover letters for specific; roles in online communications and freelancing."
    },
    {
      "week_number": 4,
      "topic": "Professional Development: Developing skills for interviewing, salary negotiations,; and maintaining professionalism in various roles."
    },
    {
      "week_number": 5,
      "topic": "Setting Business Goals and Working with Clients: Establishing a vision for; freelancing, defining specialties, and creating client onboarding strategies."
    },
    {
      "week_number": 6,
      "topic": "Project Organization and Requests for Proposals (RFPs): Structuring timelines,; policies, and procedures to manage freelance projects effectively."
    },
    {
      "week_number": 7,
      "topic": "Industry Navigation – Determining a Fee and Selecting a Specialty: Researching; industry standards, setting appropriate rates, and identifying unique offerings."
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "New Client Acquisition: Strategies for building a client base, preparing contracts,; and designing marketing materials."
    },
    {
      "week_number": 10,
      "topic": "Becoming an Industry Expert: Establishing authority through thought leadership,; workshops, and content creation."
    },
    {
      "week_number": 11,
      "topic": "Contracting Out: Learning the basics of outsourcing, building partnerships, and; scaling freelance operations."
    },
    {
      "week_number": 12,
      "topic": "Reputation Management: Managing client feedback, addressing disputes, and; maintaining a strong professional image."
    },
    {
      "week_number": 13,
      "topic": "The Use and Value of Freelancers – Managers’ Perspectives: Understanding; freelancers’ role in modern organizations and navigating organizational expectations."
    },
    {
      "week_number": 14,
      "topic": "Independent Professionals – Legal Issues and Challenges: Reviewing contracts,; intellectual property, taxes, and ethical considerations in freelancing."
    },
    {
      "week_number": 15,
      "topic": "Introduction to Freelancing and Types of Freelancing: Exploring freelance; categories and matching skills to opportunities."
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA4162": {
  "code": "BUSA4162",
  "title": "Big Data Analytics in Business",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to Big Data: Characteristics of Data, Evolution of Big Data, Definition; of Big Data, Challenges with Big Data, Traditional Business Intelligence (BI) versus Big"
    },
    {
      "week_number": 2,
      "topic": "Big Data Analytics: Classification of Analytics, Importance and Challenges of Big; Data, Terminologies in Big Data Environments, and the Big Data Technology Landscape"
    },
    {
      "week_number": 3,
      "topic": "Big Data Programming with Hive: Hive Architecture, Data Types, File Format,; Hive Query Language (HQL), and User-Defined Functions (UDF)"
    },
    {
      "week_number": 4,
      "topic": "Big Data Programming with Pig: Pig on Hadoop, Pig Philosophy, ETL Processing,; Pig Latin Overview, Relational Operators, and Word Count Example Using Pig"
    },
    {
      "week_number": 5,
      "topic": "Data Analytics: Understanding Customer Behavior and Predicting Profitability"
    },
    {
      "week_number": 6,
      "topic": "Data Analytics: Customer Preferences, Predictive Modeling, and Data Clustering; Techniques"
    },
    {
      "week_number": 7,
      "topic": "Big Data Web Mining: Web Data Analysis, Sentiment Analysis, and; Recommendation Systems"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Deep Analytics and Visualization: Advanced Visualization Techniques, Interactive; Dashboards, and Data Storytelling"
    },
    {
      "week_number": 10,
      "topic": "Large-Scale Graph Processing Techniques: Graph Analytics, Community; Detection, and Network Analysis"
    },
    {
      "week_number": 11,
      "topic": "Big Data Stream Techniques and Algorithms: Real-Time Data Processing,; Apache Kafka, and Spark Streaming"
    },
    {
      "week_number": 12,
      "topic": "Large-Scale Probabilistic Data Analysis: Bayesian Methods, Monte Carlo; Simulations, and Applications in Predictive Analytics"
    },
    {
      "week_number": 13,
      "topic": "Big Data Privacy and Security: Legal and Ethical Considerations, Data; Encryption, and Anonymization Techniques"
    },
    {
      "week_number": 14,
      "topic": "Advanced Big Data Visualization: Tools for Visualizing Large Data Sets,; Infographics, and Visualizing Unstructured Data"
    },
    {
      "week_number": 15,
      "topic": "Case Studies and Practical Applications of Big Data Analytics in Business,; Healthcare, and Finance"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA4163": {
  "code": "BUSA4163",
  "title": "Predictive Analytics",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Predictive Analytics - Advanced Principles and Case Studies Part 1"
    },
    {
      "week_number": 2,
      "topic": "; Chapter 1: Introduction to Predictive Analytics"
    },
    {
      "week_number": 3,
      "topic": "Predictive Analytics - Advanced Principles and Case Studies Part 3"
    },
    {
      "week_number": 4,
      "topic": "; Chapter 2: Know Your Data – Data Preparation"
    },
    {
      "week_number": 5,
      "topic": "Predictive Analytics - Advanced Principles and Case Studies Part 5"
    },
    {
      "week_number": 6,
      "topic": "; Chapter 3: What Descriptive Statistics Tell Us"
    },
    {
      "week_number": 7,
      "topic": "Predictive Analytics - Advanced Principles and Case Studies Part 7"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Predictive Analytics - Advanced Principles and Case Studies Part 9"
    },
    {
      "week_number": 10,
      "topic": "Predictive Analytics - Advanced Principles and Case Studies Part 10"
    },
    {
      "week_number": 11,
      "topic": "; Chapter 5: Model Comparisons and Scoring"
    },
    {
      "week_number": 12,
      "topic": "Predictive Analytics - Advanced Principles and Case Studies Part 12"
    },
    {
      "week_number": 13,
      "topic": "; Chapter 8: Finding Associations Through Cluster Analysis"
    },
    {
      "week_number": 14,
      "topic": "Predictive Analytics - Advanced Principles and Case Studies Part 14"
    },
    {
      "week_number": 15,
      "topic": "; Chapter 9: Text Analytics – Using Qualitative Data to Support Quantitative Results; Applying Predictive Analytics by Richard V. McCarthy, Wendy Ceccucci, and Mary M. McCarthy, Latest"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA4165": {
  "code": "BUSA4165",
  "title": "People Analytics and HR Data Science",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to People Analytics and HR Data Science; Students will explore the evolution of HR from traditional practices to data-driven"
    },
    {
      "week_number": 2,
      "topic": "HR Data Collection and Preparation; This week covers methods for collecting HR data through surveys, recruitment platforms,"
    },
    {
      "week_number": 3,
      "topic": "Data Analysis for Talent Acquisition; Students will focus on analyzing recruitment data to improve talent acquisition processes."
    },
    {
      "week_number": 4,
      "topic": "Employee Engagement and Retention Analytics; Students will analyze factors influencing employee satisfaction and retention. Techniques"
    },
    {
      "week_number": 5,
      "topic": "Performance Management and Productivity Analysis; This week covers methods to analyze employee performance data. Topics include linking"
    },
    {
      "week_number": 6,
      "topic": "Diversity, Equity, and Inclusion Analytics; Students will study how data can improve workplace diversity and address biases. Topics"
    },
    {
      "week_number": 7,
      "topic": "Workforce Planning and Organizational Design; This week focuses on forecasting workforce needs using predictive analytics. Students will"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "HR Data Visualization with Power BI; Students will learn to create interactive dashboards and reports using Power BI. Topics"
    },
    {
      "week_number": 10,
      "topic": "HR Data Visualization with Tableau; This week introduces Tableau for creating advanced visualizations and dashboards. Students"
    },
    {
      "week_number": 11,
      "topic": "Predictive Modeling in HRM; Students will apply machine learning techniques to build predictive models for HR; scenarios. Topics include predicting turnover, identifying high-potential employees, and"
    },
    {
      "week_number": 12,
      "topic": "Text and Sentiment Analysis in HRM; Students will explore text mining techniques for analyzing employee feedback, survey"
    },
    {
      "week_number": 13,
      "topic": "Ethical Considerations in HR Analytics; This week focuses on data privacy, ethical concerns, and regulatory frameworks such as"
    },
    {
      "week_number": 14,
      "topic": "HR Analytics Case Studies; Students will analyze real-world case studies to understand the application of people"
    },
    {
      "week_number": 15,
      "topic": "Advanced Trends in People Analytics; This week focuses on emerging technologies such as AI in people analytics, real-time"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA4164": {
  "code": "BUSA4164",
  "title": "Business Analytics Strategy",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to Business Analytics Strategy; Students will explore the strategic importance of business analytics and its role in decision-"
    },
    {
      "week_number": 2,
      "topic": "Aligning Analytics with Business Goals; This week focuses on aligning analytics initiatives with organizational priorities. Students"
    },
    {
      "week_number": 3,
      "topic": "Data Governance and Quality Management; Students will study the principles of data governance, including data ownership,"
    },
    {
      "week_number": 4,
      "topic": "Analytics Maturity Models; This week introduces analytics maturity models to assess organizational readiness. Students"
    },
    {
      "week_number": 5,
      "topic": "Building an Analytics Roadmap; Students will learn to design an analytics roadmap, outlining short-term and long-term"
    },
    {
      "week_number": 6,
      "topic": "Analytics Tools and Technologies; This week covers the selection and evaluation of analytics tools and platforms. Students will"
    },
    {
      "week_number": 7,
      "topic": "Organizational Culture and Change Management; Students will study the role of organizational culture in analytics adoption. Topics include"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Leadership in Business Analytics; This week emphasizes the role of leadership in driving analytics strategies. Students will"
    },
    {
      "week_number": 10,
      "topic": "Ethics and Legal Considerations in Analytics; Students will explore the ethical and legal implications of analytics, including data privacy,"
    },
    {
      "week_number": 11,
      "topic": "Measuring Analytics Success; This week focuses on evaluating the impact of analytics initiatives. Students will learn to"
    },
    {
      "week_number": 12,
      "topic": "Case Studies in Business Analytics Strategy; Students will analyze real-world case studies to understand the challenges and success"
    },
    {
      "week_number": 13,
      "topic": "Emerging Trends in Business Analytics; This week explores emerging trends in business analytics, including AI-driven analytics,"
    },
    {
      "week_number": 14,
      "topic": "Designing a Comprehensive Analytics Strategy; Students will integrate their learning to design a comprehensive analytics strategy for an"
    },
    {
      "week_number": 15,
      "topic": "Project Development; Students will work on a project to develop and present an analytics strategy for a real-world"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA4166": {
  "code": "BUSA4166",
  "title": "Machine Learning",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to Machine Learning: Overview, Applications, and Types of Learning; (Supervised, Unsupervised, and Reinforcement)"
    },
    {
      "week_number": 2,
      "topic": "Data Preprocessing: Handling Missing Data, Normalization, Standardization,; Encoding Categorical Variables"
    },
    {
      "week_number": 3,
      "topic": "Supervised Learning: Linear Regression, Gradient Descent, and Model Evaluation; Metrics (MSE, R²)"
    },
    {
      "week_number": 4,
      "topic": "Supervised Learning (Continued): Logistic Regression, Binary Classification, and; Decision Boundary Interpretation"
    },
    {
      "week_number": 5,
      "topic": "Tree-Based Models: Decision Trees, Overfitting, Pruning, and Random Forests"
    },
    {
      "week_number": 6,
      "topic": "Support Vector Machines (SVMs): Concept of Margins, Kernel Trick, and; Classification Problems"
    },
    {
      "week_number": 7,
      "topic": "Unsupervised Learning: k-Means Clustering, Hierarchical Clustering, and; Evaluation Metrics"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Principal Component Analysis (PCA): Dimensionality Reduction and Applications"
    },
    {
      "week_number": 10,
      "topic": "Neural Networks: Basics of Artificial Neural Networks, Forward and Backward; Propagation"
    },
    {
      "week_number": 11,
      "topic": "Deep Learning: Introduction to Convolutional Neural Networks (CNNs) and; Recurrent Neural Networks (RNNs)"
    },
    {
      "week_number": 12,
      "topic": "Reinforcement Learning: Markov Decision Processes, Q-Learning, and; Applications"
    },
    {
      "week_number": 13,
      "topic": "Model Validation and Hyperparameter Tuning: Cross-Validation, Grid Search,; and Random Search"
    },
    {
      "week_number": 14,
      "topic": "Ethical Considerations in Machine Learning: Bias, Fairness, Transparency, and; Accountability"
    },
    {
      "week_number": 15,
      "topic": "Case Studies: Applications of Machine Learning in Business, Healthcare, and; Finance"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA4167": {
  "code": "BUSA4167",
  "title": "Accounting Application with SAP",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to ERP Systems and SAP: Overview of ERP Systems, Role of SAP in; Business Processes, Introduction to SAP Navigation and Interfaces"
    },
    {
      "week_number": 2,
      "topic": "Overview of SAP Financial Accounting (FI) Module: General Ledger (GL),; Accounts Payable (AP), and Accounts Receivable (AR)"
    },
    {
      "week_number": 3,
      "topic": "Setting Up General Ledger in SAP: Chart of Accounts, Creating and Managing GL; Accounts"
    },
    {
      "week_number": 4,
      "topic": "Accounts Payable Processes in SAP: Vendor Master Data, Invoice Processing, and; Payment Management"
    },
    {
      "week_number": 5,
      "topic": "Accounts Receivable Processes in SAP: Customer Master Data, Billing, and; Receivables Management"
    },
    {
      "week_number": 6,
      "topic": "Bank Accounting in SAP: Cash Journal, Bank Reconciliations, and Electronic; Payments"
    },
    {
      "week_number": 7,
      "topic": "Financial Reporting and Compliance: Balance Sheet, Profit & Loss Reports, and; Compliance in SAP"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Introduction to SAP Controlling (CO) Module: Cost Center Accounting, Profit; Center Accounting, and Internal Orders"
    },
    {
      "week_number": 10,
      "topic": "Cost Allocation in SAP CO: Assessments and Distributions, Activity-Based; Costing"
    },
    {
      "week_number": 11,
      "topic": "Profitability Analysis (CO-PA) in SAP: Market Segment Reporting and; Contribution Margin Analysis"
    },
    {
      "week_number": 12,
      "topic": "Integration of FI and CO Modules: Real-Time Financial and Managerial; Reporting"
    },
    {
      "week_number": 13,
      "topic": "Advanced Reporting with SAP: Financial Statement Versions, Drill-Down; Reports, and Custom Reports"
    },
    {
      "week_number": 14,
      "topic": "Automation in SAP: Workflow Management, Automating Journal Entries, and; Compliance Reporting"
    },
    {
      "week_number": 15,
      "topic": "Case Studies in Accounting with SAP: Practical Scenarios and Problem-Solving"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA4168": {
  "code": "BUSA4168",
  "title": "Concepts of Decision Support System",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to Decision Support Systems; Students will explore the evolution, definition, and importance of DSS. Topics include the"
    },
    {
      "week_number": 2,
      "topic": "DSS Architecture and Technologies; This week covers the architecture of Decision Support Systems, including data management,"
    },
    {
      "week_number": 3,
      "topic": "Data Management in DSS; Students will study how DSS leverage data warehouses, data marts, and online analytical"
    },
    {
      "week_number": 4,
      "topic": "Models and Analytical Tools in DSS; This week introduces students to modeling techniques, including optimization, simulation,"
    },
    {
      "week_number": 5,
      "topic": "DSS Development Process; Students will learn about the lifecycle of DSS development, including requirements; gathering, system design, implementation, and evaluation. Agile and iterative approaches to"
    },
    {
      "week_number": 6,
      "topic": "Group Decision Support Systems (GDSS); The focus will shift to Group Decision Support Systems, which facilitate collaborative"
    },
    {
      "week_number": 7,
      "topic": "Intelligent Decision Support Systems; Students will explore the integration of artificial intelligence (AI) and machine learning in"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Visualization and Reporting in DSS; This week covers the role of data visualization and dashboard reporting in DSS. Students"
    },
    {
      "week_number": 10,
      "topic": "DSS Applications in Business Domains; Students will study case studies of DSS applications in marketing, finance, supply chain, and"
    },
    {
      "week_number": 11,
      "topic": "Risk Analysis and Decision Making; This week addresses risk analysis techniques used in DSS, including Monte Carlo"
    },
    {
      "week_number": 12,
      "topic": "Ethical and Managerial Considerations; Students will examine the ethical and managerial implications of DSS, including data"
    },
    {
      "week_number": 13,
      "topic": "Emerging Trends in DSS; This week explores advancements in DSS, including cloud-based DSS, mobile DSS, and the"
    },
    {
      "week_number": 14,
      "topic": "DSS Design and Prototyping; Students will design and prototype a basic DSS for a selected business problem. The focus"
    },
    {
      "week_number": 15,
      "topic": "Capstone Project Development; Students will finalize their capstone project by refining their DSS prototypes, preparing"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA4169": {
  "code": "BUSA4169",
  "title": "Business Simulation",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to Business Simulation; Students will be introduced to the concept of business simulation and its importance in"
    },
    {
      "week_number": 2,
      "topic": "Strategic Planning and Decision-Making; This week focuses on the fundamentals of strategic planning and its application in"
    },
    {
      "week_number": 3,
      "topic": "Marketing Strategies in Business Simulations; Students will explore marketing strategy formulation, including market segmentation,"
    },
    {
      "week_number": 4,
      "topic": "Financial Management in Simulated Environments; This week covers financial decision-making, including budget allocation, profit and loss"
    },
    {
      "week_number": 5,
      "topic": "Operations and Supply Chain Management; Students will manage production planning, inventory control, and supply chain logistics."
    },
    {
      "week_number": 6,
      "topic": "Human Resource Management in Business Simulations; The focus will be on workforce planning, recruitment, training, and performance"
    },
    {
      "week_number": 7,
      "topic": "Adapting to Market Dynamics; Students will learn to adapt strategies based on competitor actions, market trends, and"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Competitive Analysis and Strategic Adjustments; This week emphasizes the analysis of competitors and industry benchmarks. Students will"
    },
    {
      "week_number": 10,
      "topic": "Data-Driven Decision-Making; Students will focus on the use of analytics in simulations, including interpreting performance"
    },
    {
      "week_number": 11,
      "topic": "Crisis Management and Contingency Planning; This week covers managing crises such as economic downturns, supply chain disruptions,"
    },
    {
      "week_number": 12,
      "topic": "Sustainability and Corporate Social Responsibility (CSR); Students will explore the role of sustainability and CSR in business strategy. Topics include"
    },
    {
      "week_number": 13,
      "topic": "Final Simulation Strategy Development; Students will prepare for the final simulation round by refining their strategies based on"
    },
    {
      "week_number": 14,
      "topic": "Final Simulation Execution; The final round of simulation will take place, where students will apply their refined"
    },
    {
      "week_number": 15,
      "topic": "Final Project Preparation; Students will prepare a comprehensive report and presentation summarizing their simulation"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA4170": {
  "code": "BUSA4170",
  "title": "Cybersecurity",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to Cybersecurity; Students will be introduced to the fundamental concepts of cybersecurity, including its"
    },
    {
      "week_number": 2,
      "topic": "Cybersecurity Frameworks and Principles; This week focuses on key cybersecurity frameworks such as NIST and ISO/IEC 27001."
    },
    {
      "week_number": 3,
      "topic": "Network Security Fundamentals; Students will explore the basics of securing networks, including firewalls, intrusion"
    },
    {
      "week_number": 4,
      "topic": "Cryptography Basics; This week delves into the principles of cryptography, covering encryption, decryption, and"
    },
    {
      "week_number": 5,
      "topic": "Cyber Threats and Vulnerabilities; Students will learn about various cyber threats such as malware, phishing, ransomware, and"
    },
    {
      "week_number": 6,
      "topic": "Risk Management in Cybersecurity; This week covers risk assessment and mitigation strategies. Students will study risk"
    },
    {
      "week_number": 7,
      "topic": "Incident Response and Recovery; Students will be introduced to incident response planning and recovery strategies. Topics"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Ethical Hacking and Penetration Testing; This week focuses on ethical hacking principles and techniques. Students will learn about"
    },
    {
      "week_number": 10,
      "topic": "Cybersecurity in Cloud Computing; Students will explore the challenges of securing cloud environments. Topics include cloud"
    },
    {
      "week_number": 11,
      "topic": "Cybersecurity and IoT (Internet of Things); This week addresses the unique security challenges posed by IoT devices. Students will"
    },
    {
      "week_number": 12,
      "topic": "Legal and Ethical Aspects of Cybersecurity; Students will study the legal, ethical, and regulatory considerations in cybersecurity. Topics"
    },
    {
      "week_number": 13,
      "topic": "Advanced Topics in Cybersecurity; This week explores advanced cybersecurity topics such as artificial intelligence in threat"
    },
    {
      "week_number": 14,
      "topic": "Cybersecurity Strategy Development; Students will learn how to develop a comprehensive cybersecurity strategy for organizations."
    },
    {
      "week_number": 15,
      "topic": "Capstone Project and Presentation Preparation; Students will work on a capstone project that involves analyzing a real-world cybersecurity"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA4171": {
  "code": "BUSA4171",
  "title": "Database Design & Application",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to Databases and Data Science"
    },
    {
      "week_number": 2,
      "topic": "Data Modeling and Database Design"
    },
    {
      "week_number": 3,
      "topic": "Normalization and Database Optimization"
    },
    {
      "week_number": 4,
      "topic": "Introduction to SQL"
    },
    {
      "week_number": 5,
      "topic": "Advanced SQL"
    },
    {
      "week_number": 6,
      "topic": "NoSQL Databases for Data Science"
    },
    {
      "week_number": 7,
      "topic": "Data Warehousing and ETL Processes"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Integrating Databases with Python/R"
    },
    {
      "week_number": 10,
      "topic": "Database Applications in Data Science"
    },
    {
      "week_number": 11,
      "topic": "Handling Big Data in Databases"
    },
    {
      "week_number": 12,
      "topic": "Security and Privacy in Databases"
    },
    {
      "week_number": 13,
      "topic": "Case Studies in Database Design for Data Science"
    },
    {
      "week_number": 14,
      "topic": "Performance Optimization"
    },
    {
      "week_number": 15,
      "topic": "Final Project Preparation and Review"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA4172": {
  "code": "BUSA4172",
  "title": "Advanced Business Analytics",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to Advanced Business Analytics"
    },
    {
      "week_number": 2,
      "topic": "Introduction to Advanced Business Analytics"
    },
    {
      "week_number": 3,
      "topic": "Data Preparation and Feature Engineering"
    },
    {
      "week_number": 4,
      "topic": "Data Preparation and Feature Engineering"
    },
    {
      "week_number": 5,
      "topic": "Predictive Analytics"
    },
    {
      "week_number": 6,
      "topic": "Predictive Analytics"
    },
    {
      "week_number": 7,
      "topic": "Prescriptive Analytics and Optimization"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Machine Learning for Business Analytics"
    },
    {
      "week_number": 10,
      "topic": "Machine Learning for Business Analytics"
    },
    {
      "week_number": 11,
      "topic": "Big Data Analytics"
    },
    {
      "week_number": 12,
      "topic": "Big Data Analytics"
    },
    {
      "week_number": 13,
      "topic": "Data Visualization and Storytelling"
    },
    {
      "week_number": 14,
      "topic": "Data Visualization and Storytelling"
    },
    {
      "week_number": 15,
      "topic": "Capstone Project and Final Presentations"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA4173": {
  "code": "BUSA4173",
  "title": "Blockchain Management and Applications",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to Blockchain Technology"
    },
    {
      "week_number": 2,
      "topic": "Introduction to Blockchain Technology"
    },
    {
      "week_number": 3,
      "topic": "Blockchain Architecture and Platforms"
    },
    {
      "week_number": 4,
      "topic": "Blockchain Architecture and Platforms; (DPoS)"
    },
    {
      "week_number": 5,
      "topic": "Smart Contracts and Decentralized Applications (dApps)"
    },
    {
      "week_number": 6,
      "topic": "Smart Contracts and Decentralized Applications (dApps)"
    },
    {
      "week_number": 7,
      "topic": "Blockchain in Supply Chain Management"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Blockchain Applications in Finance and Banking"
    },
    {
      "week_number": 10,
      "topic": "Blockchain Applications in Finance and Banking"
    },
    {
      "week_number": 11,
      "topic": "Blockchain in Healthcare and Digital Identity Management"
    },
    {
      "week_number": 12,
      "topic": "Blockchain in Healthcare and Digital Identity Management"
    },
    {
      "week_number": 13,
      "topic": "Legal, Ethical, and Regulatory Considerations"
    },
    {
      "week_number": 14,
      "topic": "Legal, Ethical, and Regulatory Considerations"
    },
    {
      "week_number": 15,
      "topic": "Project Development and Presentation"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
},
  "BUSA4174": {
  "code": "BUSA4174",
  "title": "Qualitative Data Analysis",
  "credit_hours": "3",
  "weeks": [
    {
      "week_number": 1,
      "topic": "Introduction to Qualitative Analysis; Students will explore the characteristics and purposes of qualitative research. Topics include"
    },
    {
      "week_number": 2,
      "topic": "Research Design in Qualitative Analysis; This week focuses on designing a qualitative research study. Topics include defining"
    },
    {
      "week_number": 3,
      "topic": "Data Collection Methods: Interviews; Students will learn about designing, conducting, and recording interviews. Topics include"
    },
    {
      "week_number": 4,
      "topic": "Data Collection Methods: Focus Groups; This week covers the use of focus groups in qualitative research. Students will learn about"
    },
    {
      "week_number": 5,
      "topic": "Data Collection Methods: Observations; Students will explore observation techniques, including participant and non-participant"
    },
    {
      "week_number": 6,
      "topic": "Case Study Research and Document Analysis; This week covers case study methodology and the use of documents as data sources."
    },
    {
      "week_number": 7,
      "topic": "Introduction to Qualitative Data Analysis; Students will learn the principles of qualitative data analysis, including data coding,"
    },
    {
      "week_number": 8,
      "topic": "MID TERM EXAMINATION"
    },
    {
      "week_number": 9,
      "topic": "Thematic and Content Analysis; This week focuses on applying thematic and content analysis techniques to qualitative data."
    },
    {
      "week_number": 10,
      "topic": "Narrative Analysis and Discourse Analysis; Students will explore narrative and discourse analysis as tools to interpret qualitative data."
    },
    {
      "week_number": 11,
      "topic": "Using Qualitative Data Analysis Software; This week provides hands-on training in NVivo or Atlas.ti. Students will learn to import,"
    },
    {
      "week_number": 12,
      "topic": "Validity and Reliability in Qualitative Research; Students will discuss the concepts of rigor, trustworthiness, and credibility in qualitative"
    },
    {
      "week_number": 13,
      "topic": "Ethical Considerations in Qualitative Research; This week addresses ethical issues in qualitative research, including informed consent,"
    },
    {
      "week_number": 14,
      "topic": "Writing and Presenting Qualitative Findings; Students will learn how to organize and present qualitative findings in a scholarly format."
    },
    {
      "week_number": 15,
      "topic": "Case Studies in Qualitative Analysis; Students will analyze real-world examples of qualitative research to understand best"
    },
    {
      "week_number": 16,
      "topic": "FINAL TERM EXAMINATION"
    }
  ]
}
};

/**
 * Normalizes a course code (removes spaces, hyphens, uppercases)
 */
export function normalizeCourseCode(code: string): string {
  if (!code) return '';
  return code.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

/**
 * Searches for an official course outline by Course Code (e.g. BUSA1111, BUSA-1111, MGT-201)
 * or by Course Title / Subject Name (e.g. 'Introduction to Business', 'Financial Accounting').
 */
export function getOfficialCourseOutline(codeOrName: string, nameFallback?: string): OfficialCourseOutline | null {
  if (!codeOrName && !nameFallback) return null;

  const cleanTargetCode = normalizeCourseCode(codeOrName);
  const targetTitle = (nameFallback || codeOrName).toLowerCase().trim();

  // 1. Direct match by exact normalized code
  if (cleanTargetCode && OFFICIAL_COURSE_OUTLINES[cleanTargetCode]) {
    return OFFICIAL_COURSE_OUTLINES[cleanTargetCode];
  }

  // 2. Search by key in dictionary
  for (const [key, outline] of Object.entries(OFFICIAL_COURSE_OUTLINES)) {
    if (normalizeCourseCode(key) === cleanTargetCode || normalizeCourseCode(outline.code) === cleanTargetCode) {
      return outline;
    }
  }

  // 3. Search by title match or contains
  for (const outline of Object.values(OFFICIAL_COURSE_OUTLINES)) {
    const outlineTitle = outline.title.toLowerCase().trim();
    if (
      outlineTitle === targetTitle ||
      (targetTitle.length > 4 && outlineTitle.includes(targetTitle)) ||
      (targetTitle.length > 4 && targetTitle.includes(outlineTitle))
    ) {
      return outline;
    }
  }

  // 4. Fallback search by code prefix or common aliases
  const commonAliases: Record<string, string> = {
    'MGT201': 'BUSA3119', // Organizational Behavior
    'MGT101': 'BUSA3111', // Principles of Management
    'MKT301': 'BUSA2114', // Principles of Marketing
    'ACC101': 'BUAS1113', // Fundamentals of Accounting
    'ACC201': 'BUAS3112', // Financial Accounting
    'FIN201': 'BUSA2112', // Business Finance
    'FIN301': 'BUSA3122', // Financial Management
    'ECO101': 'ECON1111', // Microeconomics
    'ECO102': 'ECON1116', // Macroeconomics
    'ENG101': 'ENGL1114', // Functional English
    'ENG102': 'ENGL1120', // Expository Writing
    'CS101': 'COMP1116',  // Application of ICT
    'PAK101': 'PAKS1119', // Ideology & Constitution of Pakistan
    'ISL101': 'ISLA1111', // Islamic Studies
    'HRM301': 'BUSA2115', // Human Resource Management
    'SCM301': 'BUSA3121', // Operations and Supply Chain
    'BUS101': 'BUSA1111', // Introduction to Business
  };

  const aliasMatch = commonAliases[cleanTargetCode];
  if (aliasMatch && OFFICIAL_COURSE_OUTLINES[aliasMatch]) {
    return OFFICIAL_COURSE_OUTLINES[aliasMatch];
  }

  return null;
}

/**
 * Generates or retrieves 16-week topic coverage array for a course.
 * Always guarantees:
 * - Week 8 = "MID TERM EXAMINATION"
 * - Week 16 = "FINAL TERM EXAMINATION"
 * - Weeks 1-7 = Pre-midterm syllabus
 * - Weeks 9-15 = Post-midterm syllabus
 */
export function get16WeekCoverageForCourse(courseCode: string, courseTitle?: string): { week_number: number; topics_covered: string }[] {
  const outline = getOfficialCourseOutline(courseCode, courseTitle);
  
  if (outline && outline.weeks && outline.weeks.length === 16) {
    return outline.weeks.map(w => ({
      week_number: w.week_number,
      topics_covered: w.topic
    }));
  }

  const title = courseTitle || courseCode || 'Course';
  return [
    { week_number: 1, topics_covered: `Introduction to ${title}: Course Overview, Scope, Objectives & Foundational Concepts` },
    { week_number: 2, topics_covered: `Core Theoretical Frameworks & Key Principles in ${title}` },
    { week_number: 3, topics_covered: `Operational Dimensions, Methodologies & Contemporary Industrial Applications` },
    { week_number: 4, topics_covered: `Analytical Techniques, Models, Problem Formulation & Case Analysis` },
    { week_number: 5, topics_covered: `Quantitative & Qualitative Evaluation Methods in ${title}` },
    { week_number: 6, topics_covered: `Mid-Semester Revision, Practical Assignments & Applied Problem Solving` },
    { week_number: 7, topics_covered: `Case Study Discussion, Class Presentations & Formative Evaluation` },
    { week_number: 8, topics_covered: `MID TERM EXAMINATION` },
    { week_number: 9, topics_covered: `Post-Midterm Advanced Topics: Strategies, Systems & Empirical Integration` },
    { week_number: 10, topics_covered: `Specialized Applications, Emerging Paradigms & Technology Integration in ${title}` },
    { week_number: 11, topics_covered: `Managerial Decision Making, Compliance & Best Practices` },
    { week_number: 12, topics_covered: `Industry Insights, Empirical Modeling & Advanced Problem Sets` },
    { week_number: 13, topics_covered: `Comprehensive Project Development, Field Applications & Data Synthesis` },
    { week_number: 14, topics_covered: `Final Project Submissions, Peer Review & Capstone Discussions` },
    { week_number: 15, topics_covered: `Semester Wrap-up, Comprehensive Syllabus Review & Final Exam Preparation` },
    { week_number: 16, topics_covered: `FINAL TERM EXAMINATION` }
  ];
}
