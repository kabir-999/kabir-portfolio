# KABIR FC — The Career Mode

An interactive football-club portfolio for **Kabir Mathur**. Projects are players, formations are tactical views, the career timeline is a season history, and engineering trade-offs are playable decisions.

Live: <https://kabir-rexi.emergent.host/>

Stack: React 19 · TypeScript · Vite · Tailwind CSS v4 · Motion · Lucide. No backend, database, API key, or paid service.

## Contents
1. [Manager](#manager) 2. [Skills](#skills) 3. [Squad: projects](#squad-projects) 4. [Formations](#formations) 5. [Career timeline](#career-timeline) 6. [Ballon d'Or](#ballon-dor) 7. [Trophies](#department-trophies) 8. [Decision scenarios](#decision-scenarios) 9. [Contact](#contact) 10. [Run and verify](#run-locally)

## Manager
**Kabir Mathur** — AI/ML Engineer · Full-Stack Systems · Applied Computer Vision
- Location: Mumbai, India
- Education: B.Tech, Computer Science & Engineering (Data Science), SVKM's D.J. Sanghvi College of Engineering, Mumbai (2023–2027), CGPA 8.648/10, Honours in Financial Computing
- Schooling: Poddar Brio International, Badlapur (Class XII: 76%)
- Current role: Project Trainee, Larsen & Toubro Precision Engineering and Systems

I'm a data science student and AI/ML developer from Mumbai. I've built smart glasses for the visually impaired, a no-code app generator and a real-time PPE detection system, and I lead my department's tech teams.

## Skills
- **Languages:** Python, Java, SQL
- **AI / ML:** Machine Learning, Deep Learning, NLP, Computer Vision, Reinforcement Learning, RAG, AI Agents, Agentic AI
- **Data Engineering:** Apache Airflow, Apache Kafka, PySpark, PostgreSQL
- **Frameworks:** TensorFlow, PyTorch, LangChain, LangGraph, n8n, Hugging Face, OpenCV, FAISS
- **Development & Cloud:** Flask, FastAPI, Spring Boot, React, Firebase, MongoDB, Docker, AWS

## Squad: projects
15 projects, each a "player" with a kit number and position.

| # | Pos | Project | Category |
|---|-----|---------|----------|
| 1 | GK | Perry | Backend Systems |
| 3 | LB | Crop Disease | Computer Vision |
| 4 | CB | ChainPay | Backend Systems |
| 5 | CB | Anti-Spoof | Computer Vision |
| 6 | CDM | Drone Audio | Applied ML & NLP |
| 7 | CAM | Real Estate | Backend Systems, Applied ML & NLP |
| 8 | CM | AQI Stream | Data Pipelines |
| 9 | ST | SafeGuard | Computer Vision |
| 10 | RW | Twinformer | Applied ML & NLP, Backend Systems |
| 11 | LW | Artifact ID | Computer Vision |
| 12 | RM | FocusFlow | Applied ML & NLP, Backend Systems |
| 13 | CB | Chain Voting | Backend Systems |
| 14 | LM | Spectrasense | Computer Vision |
| 15 | CAM | NoCode Engine | Applied ML & NLP |
| 16 | RW | Deforestation | Computer Vision |

### #1 GK — Perry — Automated Web Security Scanner
*Goalkeeper · Backend Systems*

**Problem it solves:** Finding security holes in a web app without drowning in false alarms.

**Overview:** A vulnerability scanner combining static analysis with headless-Chromium crawling. Also referred to as Sentinel in the project brief.

**Architecture**
- 12 testing modules with anomaly-based validation to cut false positives.
- Deterministic risk scoring with real-time SSE streaming.

**Skills used:** FastAPI, Playwright, PostgreSQL, AWS, Docker, React, TypeScript

**Results**
- Testing modules: **12**

**Links:** [Live demo](https://perryspies.duckdns.org/)

### #3 LB — AI Crop Disease Detection (Shetkari)
*Left-back · Computer Vision*

**Problem it solves:** Farmers spot crop disease late; this identifies it from a photo and suggests what to do.

**Overview:** Crop disease detection and recommendation models using image classification, environmental data, OpenCV and WeatherAPI, built as a Smart India Hackathon project and shipped inside the "Shetkari" app.

**Architecture**
- Image classification combined with environmental data and WeatherAPI inputs.
- Flutter app with real-time API communication; backend services on Firebase and Cloudinary.

**Skills used:** OpenCV, Flutter, Firebase, Cloudinary, WeatherAPI

**Results**
- Accuracy: **94%**

**Links:** [Source on GitHub](https://github.com/Aagnya-Mistry/SIH_Shetkari)

### #4 CB — ChainPay — Blockchain Payment Ledger
*Centre-back · Backend Systems*

**Problem it solves:** Recording payments in a ledger that nobody can quietly rewrite.

**Overview:** A from-scratch immutable ledger with Proof-of-Work mining and SHA-256 transaction signing.

**Architecture**
- Custom data structures (linked blockchain, transaction pool) behind RESTful APIs.
- Full-stack deployment: React/TypeScript frontend and a Dockerized backend on Render.

**Skills used:** Java, Spring Boot, React, TypeScript, SHA-256, Docker, Render

**Results**
- None recorded

**Links:** [Source on GitHub](https://github.com/kabir-999/Payment_ledger_system)

### #5 CB — Face Anti-Spoofing
*Centre-back · Computer Vision*

**Problem it solves:** Telling a real face from a photo, screen or mask, even for attacks never seen in training.

**Overview:** Face anti-spoofing using depth estimation and ResNet18. The portfolio also lists a face recognition and anti-spoofing build from the K2S2 Digistrat Solutions internship (Jun–Sep 2025).

**Architecture**
- Depth estimation combined with a ResNet18 classifier.
- K2S2 internship build: a Vision Transformer trained on 60,000+ images to classify genuine faces versus spoofing attacks.

**Skills used:** Depth estimation, ResNet18, Vision Transformer, Computer vision

**Results**
- Detection accuracy (ViT, 60,000+ images): **88%**

**Links:** None

### #6 CDM — Audio-Based Drone Detection
*Defensive midfielder · Applied ML & NLP*

**Problem it solves:** Hearing a drone through ambient noise when it is far from the microphone.

**Overview:** Audio-based drone detection using spectral features, background calibration and XGBoost.

**Architecture**
- Spectral features with background calibration, classified with XGBoost.
- Built a CRNN with attention pooling on a gain-invariant, multi-channel time-frequency front end for acoustic drone classification, robust to gain and microphone variation, with a harmonic-comb channel to cut misclassifications.

**Skills used:** Spectral features, Background calibration, XGBoost

**Results**
- Test accuracy: **95.3%**
- Test balanced accuracy: **92.3%**
- Test drone recall: **86.2%**
- Test non-drone recall: **98.5%**

**Links:** None

### #7 CAM — Real Estate Price Prediction
*Attacking midfielder · Backend Systems, Applied ML & NLP*

**Problem it solves:** Estimating a fair property price from location, size and bedrooms.

**Overview:** A web application that predicts property prices from inputs such as location, square footage and number of bedrooms.

**Architecture**
- Property data gathered with Beautiful Soup and prepared with Pandas and NumPy.
- Scikit-learn / XGBoost model served through Flask, deployed on Render.

**Skills used:** Flask, XGBoost, Scikit-learn, Beautiful Soup, Pandas, NumPy, HTML/CSS, Render

**Results**
- None recorded

**Links:** [Source on GitHub](https://github.com/kabir-999/real-estate-price-predictor)

### #8 CM — Real-Time AQI Analysis — Streaming Data Pipeline
*Central midfielder · Data Pipelines*

**Problem it solves:** Turning a constant stream of air-quality sensor data into regional pollution trends.

**Overview:** A streaming data pipeline for multi-source sensor ingestion and regional air-quality (AQI) pollution trends.

**Architecture**
- Kafka ingestion with windowed Spark aggregation for regional pollution trends.
- Airflow-orchestrated, fault-tolerant ETL with automated retries and validation.

**Skills used:** Python, Kafka, Spark, Airflow, PostgreSQL, Docker

**Results**
- None recorded

**Links:** [Source on GitHub](https://github.com/kabir-999/Real-Time-AQI)

### #9 ST — SafeGuard AI — Site Safety & Emergency Response System
*Striker · Computer Vision*

**Problem it solves:** Catching missing protective equipment on site and alerting emergency services at once.

**Overview:** A real-time PPE compliance platform (March 2026) that detects missing protective equipment across industrial CCTV feeds with a privacy-first architecture and triggers an emergency-alert workflow.

**Architecture**
- YOLOv11 model detecting missing PPE in real time (6 gear classes).
- n8n-orchestrated emergency workflow that alerts hospitals, fire stations and police from a single trigger, cutting manual dispatch time.

**Skills used:** YOLOv11, n8n, Flutter, Supabase, Three.js, Firebase

**Results**
- PPE detection mAP: **0.724**
- Precision: **81%**
- Training images: **30,000+**
- Gear classes: **6**

**Links:** [Source on GitHub](https://github.com/kabir-999/SafeOps)

### #10 RW — Twinformer — Transformer Latency Digital Twin
*Right winger · Applied ML & NLP, Backend Systems*

**Problem it solves:** Predicting how fast a Transformer will run before you run it.

**Overview:** A latency digital twin for Transformers (October 2026): a physics-based simulator and a calibrated Ridge predictor across three architectures, with a hybrid-RAG chat system on top.

**Architecture**
- Physics-based simulator plus a calibrated Ridge predictor, validated on a held-out sequence-length split.
- Hybrid RAG (FAISS + BM25, fused with reciprocal-rank fusion) over 9,113 chunks.

**Skills used:** PyTorch, Hugging Face, FAISS, FastAPI, React, TypeScript

**Results**
- Hit-Rate@3 (9,113 chunks): **100%**
- MRR: **0.71**
- Median retrieval: **3.24 ms**
- Architectures modelled: **3**

**Links:** [Source on GitHub](https://github.com/kabir-999/Twinformer)

### #11 LW — Artifact Identifier
*Left winger · Computer Vision*

**Problem it solves:** Identifying historical artifacts and checking whether they are authentic.

**Overview:** An end-to-end AI pipeline that classifies historical artifacts, checks authenticity with CNNs and extracts metadata such as era, origin, material and condition from images.

**Architecture**
- CNN-based classification and authenticity validation; metadata extraction (era, origin, material, condition).
- OpenCV crack detection, Blender 3D restoration and AR.js in-browser visualisation.

**Skills used:** TensorFlow, NumPy, Pandas, Flask, OpenCV, Blender, AR.js, HTML/CSS

**Results**
- None recorded

**Links:** [Source on GitHub](https://github.com/kabir-999/authenticity-check)

### #12 RM — FocusFlow — AI Productivity & Burnout Management
*Substitute · Applied ML & NLP, Backend Systems*

**Problem it solves:** Turning scattered tasks into a plan and warning before burnout sets in.

**Overview:** A full-stack mobile and web app with LLM-powered task structuring from text, voice and OCR input.

**Architecture**
- Task structuring from text, voice and OCR input using a Groq-hosted LLM.
- Burnout risk monitoring that analyses workload, delays and sleep patterns.

**Skills used:** Flutter, Dart, FastAPI, Firebase, Firestore, Groq LLM

**Results**
- None recorded

**Links:** [Source on GitHub](https://github.com/Aagnya-Mistry/FocusFlow)

### #13 CB — Blockchain Voting System
*Substitute · Backend Systems*

**Problem it solves:** Running a vote where records are open, tamper-proof and one per person.

**Overview:** A decentralized voting platform designed for transparency and tamper-proof records.

**Architecture**
- Smart contracts enforce one vote per user.
- Wallet-based voter verification through MetaMask.

**Skills used:** Solidity, Ethereum, Web3.js, React, MetaMask, Ganache

**Results**
- None recorded

**Links:** None

### #14 LM — Spectrasense — AI Smart Glasses
*Substitute · Computer Vision*

**Problem it solves:** Helping visually impaired users understand the world around them in real time.

**Overview:** AI-powered smart glasses for real-time object detection and scene analysis, built during the Meera AI Tech internship (Sept 2025 – March 2026).

**Architecture**
- YOLO and Qwen-2.5 for real-time object detection and scene analysis.
- FaceNet for face recognition, PaddleOCR for reading text, and Whisper for speech-to-text and text-to-speech.

**Skills used:** YOLO, Qwen-2.5, FaceNet, PaddleOCR, Whisper (STT/TTS)

**Results**
- None recorded

**Links:** None

### #15 CAM — NoCode App Developer Engine
*Substitute · Applied ML & NLP*

**Problem it solves:** Building a mobile app without writing code.

**Overview:** A no-code AI platform for end-to-end mobile app development: users generate full Android and iOS applications from prompts, with an in-browser emulator for real-time preview and testing.

**Architecture**
- Agentic architecture for automated app generation and deployment.
- In-browser emulator for real-time preview and testing; APK builds and optional source delivery.

**Skills used:** Agentic AI, Android, iOS, In-browser emulator

**Results**
- None recorded

**Links:** None

### #16 RW — Deforestation Monitoring from Satellite Imagery
*Substitute · Computer Vision*

**Problem it solves:** Tracking forest loss over time from satellite images.

**Overview:** An AI-based system that uses satellite imagery to detect forest-cover change over time.

**Architecture**
- Satellite data (Sentinel / Landsat) processed through Google Earth Engine.
- NDVI-based analysis plus ML models to detect and track forest-cover change.

**Skills used:** Python, Google Earth Engine, TensorFlow / PyTorch, OpenCV, Sentinel / Landsat

**Results**
- None recorded

**Links:** [Source on GitHub](https://github.com/kabir-999/ipd)

## Formations
The same starting XI in three tactical views; the remaining projects sit on the bench.

**4-3-3:** Perry, Crop Disease, ChainPay, Anti-Spoof, Spectrasense, AQI Stream, Drone Audio, NoCode Engine, Artifact ID, SafeGuard, Twinformer

**4-2-3-1:** Perry, Crop Disease, ChainPay, Anti-Spoof, Spectrasense, Drone Audio, AQI Stream, Artifact ID, NoCode Engine, Twinformer, SafeGuard

**3-5-2:** Perry, Anti-Spoof, ChainPay, NoCode Engine, Crop Disease, AQI Stream, Drone Audio, Twinformer, Spectrasense, Artifact ID, SafeGuard

## Career timeline
- **Class XII** — Poddar Brio International, Badlapur _(education)_. Higher secondary education, Class XII. Class XII: 76%.
- **2023–2027** — B.Tech, Computer Science & Engineering (Data Science) _(education)_. SVKM's D.J. Sanghvi College of Engineering, Mumbai · Honours in Financial Computing. CGPA: 8.648/10.
- **Aug 2024** — Events Co-committee, Society 4 Data Science _(leadership)_. Wrote and assessed original problem statements for two ML competitions. One problem for the ML hackathon DataHack 3.0 and one for Xtract 3.0, for 100+ participants.
- **Oct 2024** — AWS Machine Learning — Certified _(certification)_. Certified.
- **Dec 2024** — Smart India Hackathon 2024 — Grand Finalist _(competition)_. Selected as a national finalist in India's premier hackathon.
- **Feb 2025** — Co-Captain, Data Science Department _(leadership)_. Led 200+ students to 1st place in a 6-department interdepartmental tournament.
- **Mar 2025** — AWS Academy: Cloud Foundations — Certified _(certification)_. Certified.
- **1 Jul 2025** — Coders Arena 2025 (The Battle of Algorithms) — Finalist _(competition)_. Cracked 4 of 5 problems in the final showdown and made the ultimate round.
- **Jun – Sep 2025** — AI/ML Intern — K2S2 Digistrat Solutions _(experience)_. Developed a real-time camera-based face recognition and anti-spoofing application for live authentication.
- **Sep 2025 – Mar 2026** — AI/ML Intern — Meera AI Tech _(experience)_. Built AI smart glasses for visually impaired users and a no-code platform that generates mobile apps from prompts.
- **Coursera** — Generative AI for Data Science — Microsoft _(certification)_. Certificate.
- **Jul 2026** — Amazon ML Summer School — Selected _(certification)_. Selected.
- **Jul 2026 – Present** — Project Trainee — Larsen & Toubro Precision Engineering and Systems _(experience)_. Acoustic classification with CRNNs. Designed a gain-invariant, multi-channel time-frequency front end for CRNN acoustic classification, making the model robust to recording gain and microphone variation. Built and cross-validated a CRNN with attention pooling, replacing handcrafted features with learned representations and adding a harmonic-comb channel to reduce frequent misclassifications.

## Ballon d'Or
Top projects, ranked, with project dates.
1. **Spectrasense — AI Smart Glasses** — Ballon d'Or (Sep 2025 – Mar 2026)
2. **Twinformer — Transformer Latency Digital Twin** — Runner-up (Oct 2026)
3. **SafeGuard AI — Site Safety & Emergency Response System** — Third place (Mar 2026)
4. **NoCode App Developer Engine** — Shortlist (Sep 2025 – Mar 2026)
5. **Face Anti-Spoofing** — Shortlist (Jun – Sep 2025)
6. **AI Crop Disease Detection (Shetkari)** — Shortlist · SIH (Dec 2024)

## Department trophies
- Best Cultural Department
- IDPT Cup — Winner
- Best Sports Department

## Decision scenarios
Playable what-would-you-do exercises. Every consequence is hypothetical; none claims a measured result.

### Drone detection in noisy environments
*Project: Audio-Based Drone Detection*

A drone audio classification system becomes less reliable when the drone is far from the microphone and its signal resembles ambient noise. The documented pipeline uses spectral features, background calibration and XGBoost, and its drone recall (86.2%) trails its non-drone recall (98.5%). You have one sprint. Where do you invest it?

**Decision — Choose the sprint focus.** Missed distant drones are the main failure mode. Which lever do you pull first?

- **Improve spectral feature extraction and background calibration** — If the drone signature is faint but present, better features and a better estimate of the local noise floor could make it separable.
  - Advantages: Targets the root cause: low signal-to-noise at range. Cheap to iterate on existing recordings. Builds on the pipeline that already exists.
  - Risks: Features tuned to the recording sites may not transfer to new ones. Calibration adds a step that can drift in the field.
  - Validate by: Compare drone recall at matched false-alarm rates before and after. Evaluate on recordings from sites not used to design the features.
  - Documented: Spectral features and background calibration are already part of the evaluated pipeline. The documented results do not isolate how much each component contributes, so this choice is not claimed to be proven.
  - Feedback: A reasonable first move because it attacks the signal itself. The danger is quietly optimising for the sites you already have.
- **Increase temporal integration** — A faint but persistent tone is easier to confirm over several seconds than in one short window.
  - Advantages: Averaging suppresses random noise. Can reduce flickering predictions.
  - Risks: Adds detection latency. Can blur short or intermittent signatures. Does not help if the signal is genuinely absent.
  - Validate by: Plot recall against window length at a fixed false-alarm rate. Measure time-to-detection on approaching drones.
  - Documented: No experiment on this approach is documented in the project data, so nothing is claimed about its effect.
  - Feedback: Powerful when the signal is persistent, but it trades speed for confidence, and some applications cannot afford that.
- **Collect and evaluate more challenging ambient recordings** — Failures at range may reflect training data that never contained the hard cases.
  - Advantages: Exposes failure modes honestly. Improves the evaluation, not just the model.
  - Risks: Slow and costly to collect. Labelling distant drones is hard. No improvement is guaranteed.
  - Validate by: Build a held-out hard-case test set before any retraining. Report results per distance and noise condition.
  - Documented: No experiment on this approach is documented in the project data, so nothing is claimed about its effect.
  - Feedback: Slower, but it makes every later decision more trustworthy. Better data often beats a cleverer model.

**Decision — Suppose the new features look better. How do you check?.** Improvements on familiar data can be an illusion. What is your validation plan?

- **Hold out entire recording sites for testing** — It tests whether the features generalise to places the model has not heard.
  - Advantages: Closest to real deployment. Reveals calibration drift.
  - Risks: Needs enough distinct sites. Results will have higher variance.
  - Validate by: Report per-site recall and its spread.
  - Documented: not documented
  - Feedback: A stricter test that gives more honest numbers, even if they are lower.
- **Re-tune on the pooled data with a random split** — It is fast and uses all the data you have.
  - Advantages: Simple. Stable estimates on familiar conditions.
  - Risks: Clips from the same session can appear in both train and test, inflating scores. Hides site-specific failure.
  - Validate by: Check whether near-duplicate clips cross the split.
  - Documented: not documented
  - Feedback: Quick, but easily over-optimistic. Use it for iteration, not for the final claim.

**Decision — How do you set the integration window?.** Longer windows buy confidence and cost latency.

- **Use a fixed, longer window** — Predictable behaviour and easy to reason about.
  - Advantages: Simple to implement and test. Stable latency.
  - Risks: Penalises easy, loud detections with unnecessary delay.
  - Validate by: Sweep window length and report the recall/latency curve.
  - Documented: not documented
  - Feedback: Easy to ship, but it applies the same delay to easy and hard cases alike.
- **Accumulate evidence adaptively until confident** — Obvious drones are flagged quickly while ambiguous ones get more time.
  - Advantages: Better latency on clear cases. Spends time only where needed.
  - Risks: More complex to tune and test. Variable latency can surprise operators.
  - Validate by: Report the distribution of time-to-detection, not just its mean.
  - Documented: not documented
  - Feedback: More efficient in principle, but the behaviour is harder to specify and verify.

**Decision — How do you collect the new recordings?.** Hard recordings are expensive. How do you plan them?

- **Plan a systematic distance × noise-condition matrix** — Controlled coverage lets you see exactly where performance breaks.
  - Advantages: Interpretable per-condition results. Reproducible.
  - Risks: Controlled sessions can differ from real-world messiness.
  - Validate by: Report recall per cell of the matrix.
  - Documented: not documented
  - Feedback: Great for diagnosis. Pair it with some uncontrolled data so the lab does not become the world.
- **Gather opportunistic field recordings** — Real conditions, collected cheaply.
  - Advantages: Realistic. Low setup cost.
  - Risks: Uneven coverage. Hard to know what is missing. Labels may be noisy.
  - Validate by: Audit the label quality and the condition mix before using the data.
  - Documented: not documented
  - Feedback: Realistic but patchy. You may learn less about why failures happen.

**Ending — Debrief: features and calibration.** You improved the signal representation, then chose how strictly to test it.
- Feature work attacks the cause, but generalisation across sites is the real test.
- A leakage-free split matters as much as the feature change itself.
- Judge changes at matched false-alarm rates so recall gains are not bought with false alarms.
_Caution: This path is hypothetical. The documented results (86.2% drone recall, 98.5% non-drone recall) do not show what this change would do._

**Ending — Debrief: temporal integration.** You traded latency for confidence and decided how to spend that delay.
- Integration helps persistent signals and cannot rescue absent ones.
- Whether the latency is acceptable is a product decision, not just a modelling one.
- Report time-to-detection alongside recall.
_Caution: This path is hypothetical and no temporal-integration experiment is documented._

**Ending — Debrief: harder data.** You invested in measurement before modelling.
- A trustworthy hard-case test set makes every later change comparable.
- Structured coverage explains failures; opportunistic coverage reveals surprises.
- Data work can be slower and still be the highest-leverage choice.
_Caution: This path is hypothetical and no additional-data experiment is documented._

### Face anti-spoofing under unseen attacks
*Project: Face Anti-Spoofing*

A face anti-spoofing model (depth estimation with ResNet18) has imperfect evaluation performance and may fail to generalise to unseen attack types. What do you do first?

**Decision — Choose the first investigation.** The model is imperfect and brittle to new attacks. Where do you start?

- **Improve dataset diversity and split design** — If the model only sees a few attack styles, it can only learn those. How you split the data also decides whether your evaluation is honest.
  - Advantages: Attacks the generalisation problem directly. Improves evaluation validity.
  - Risks: Collecting new attack types is expensive. Stricter splits lower the headline score.
  - Validate by: Measure performance on attack types held out of training entirely.
  - Documented: The project uses depth estimation with ResNet18 and has imperfect evaluation performance. Dataset or split experiments are not documented here.
  - Feedback: The most direct answer to "may fail on unseen attacks" because it changes what the model sees and how you measure it.
- **Investigate class imbalance and decision thresholds** — Real and spoof samples are rarely balanced, and a default 0.5 threshold may be a poor operating point.
  - Advantages: Cheap, because no new data is needed. Often changes behaviour noticeably.
  - Risks: Can look like progress without improving generalisation. Thresholds tuned on one set may not transfer.
  - Validate by: Report error rates across the full range of thresholds, not one point.
  - Documented: No experiment on this approach is documented in the project data, so nothing is claimed about its effect.
  - Feedback: A sensible low-cost check, but remember it tunes the operating point and does not teach the model new attacks.
- **Evaluate complementary visual or depth-based signals** — Different cues (texture, frequency patterns, depth) fail in different ways, so combining them could be more robust.
  - Advantages: Diversifies failure modes. May catch attacks one cue misses.
  - Risks: More complexity, latency and maintenance. Added signals can overfit the same dataset.
  - Validate by: Run an ablation: each signal alone versus combined, on held-out attack types.
  - Documented: Depth estimation is already part of the project. Whether additional signals were tested is not documented.
  - Feedback: Promising for robustness, but only worth the complexity if an ablation shows the signals contribute differently.

**Decision — How do you split the data?.** The split determines what your score actually means.

- **Hold out whole attack types for testing** — It directly simulates meeting a new attack in deployment.
  - Advantages: Honest generalisation estimate.
  - Risks: Scores will be lower and noisier. Needs enough distinct attack types.
  - Validate by: Report per-attack-type results, not just an average.
  - Documented: not documented
  - Feedback: The harshest and most informative test of the stated worry.
- **Split by subject (identity) only** — Prevents the same person appearing in train and test.
  - Advantages: Removes identity leakage. Easy to apply.
  - Risks: Says nothing about unseen attack types.
  - Validate by: Check that performance holds across demographic and device groups.
  - Documented: not documented
  - Feedback: Necessary hygiene, but not sufficient for the unseen-attack question.

**Decision — How do you choose the operating point?.** Different mistakes cost different things: letting an attacker in versus blocking a real user.

- **Choose a threshold on validation data for a target error trade-off** — It makes the security versus convenience trade-off an explicit decision.
  - Advantages: Explicit and auditable. No retraining needed.
  - Risks: Needs a validation set that resembles deployment.
  - Validate by: Confirm the chosen threshold on a separate test set.
  - Documented: not documented
  - Feedback: Turns an implicit default into a deliberate choice.
- **Reweight classes in the loss and keep the default threshold** — It encourages the model itself to pay attention to the rarer class.
  - Advantages: Changes what is learned, not just how it is read.
  - Risks: Needs retraining. Can shift calibration unpredictably.
  - Validate by: Compare calibration and error rates against the baseline.
  - Documented: not documented
  - Feedback: Reasonable, but you still eventually need to decide where to put the threshold.

**Decision — How do you combine signals?.** More than one cue means deciding how they vote.

- **Late fusion: train separately, combine scores** — Each model can be tested and replaced independently.
  - Advantages: Modular. Easy to ablate.
  - Risks: May miss interactions between cues.
  - Validate by: Compare fused versus single-signal performance on held-out attacks.
  - Documented: not documented
  - Feedback: Easier to debug, which matters while you are still learning what works.
- **Early fusion: one model sees all signals together** — The model can learn interactions between cues.
  - Advantages: Potentially stronger joint features.
  - Risks: Harder to attribute what helps. More data hungry.
  - Validate by: Ablate input channels to confirm each one contributes.
  - Documented: not documented
  - Feedback: Higher ceiling, less transparency, and a harder path to explaining failures.

**Ending — Debrief: data and splits.** You worked on both what the model sees and how honestly it is judged.
- For unseen-attack risk, the split design is the experiment.
- A lower, honest score beats a higher, leaky one.
- Report results per attack type, not only an average.
_Caution: This path is hypothetical. No dataset or split experiment is documented for the project._

**Ending — Debrief: imbalance and thresholds.** You examined how the model is read, not what it knows.
- A threshold is a product decision about acceptable risk.
- Operating-point tuning does not by itself fix generalisation.
- Always confirm on data the tuning never touched.
_Caution: This path is hypothetical. No threshold or imbalance experiment is documented._

**Ending — Debrief: complementary signals.** You explored diversifying the evidence behind each decision.
- Complementary cues help only if they fail differently.
- Ablations are what justify added complexity.
- Modularity trades some accuracy potential for debuggability.
_Caution: This path is hypothetical. Fusion experiments beyond depth estimation are not documented._

### Latency twin drifting at long sequences
*Project: Twinformer — Transformer Latency Digital Twin*

Your Transformer latency digital twin pairs a physics-based simulator with a calibrated Ridge predictor, validated on a held-out sequence-length split. Error grows at the longest sequences, where memory traffic and the KV cache start to dominate. You have one sprint. Where do you invest it?

**Decision — Choose the sprint focus.** Predictions drift at long sequence lengths. Which lever do you pull first?

- **Refine the physics-based simulator** — If the simulator misses memory-bound behaviour, no calibration layer can fully repair it.
  - Advantages: Fixes the cause, not the symptom. Helps every architecture, not one fit.
  - Risks: Hardware modelling is detailed work. A richer model can overfit the devices you measured.
  - Validate by: Compare error per sequence-length bucket before and after. Keep the held-out length split untouched.
  - Documented: The simulator and calibrated predictor are both documented, but their individual contributions are not isolated here.
  - Feedback: The principled fix, at the cost of modelling effort and a risk of over-fitting to one device.
- **Strengthen the calibrated Ridge predictor** — Calibration is cheap and can absorb systematic error the simulator leaves behind.
  - Advantages: Fast to retrain and test. Online updates keep it current.
  - Risks: Can mask simulator errors rather than fix them. Extrapolates poorly beyond the lengths it was fitted on.
  - Validate by: Evaluate only on sequence lengths longer than any in the fit set.
  - Documented: A calibration ablation and an online retraining loop are part of the project, but no figure is claimed for this change.
  - Feedback: Cheap and effective on familiar ranges, but it is the first thing to break outside them.
- **Benchmark KV-cache reuse versus recompute at long lengths** — The KV cache is where long-sequence latency diverges, so measure it directly.
  - Advantages: Grounds the model in real measurements. Shows which regime the twin gets wrong.
  - Risks: Benchmarks are hardware-specific. Diagnoses the error without fixing it.
  - Validate by: Report latency per length with variance across repeated runs.
  - Documented: A KV-cache reuse versus recompute study is part of the project; this path is not a measured result.
  - Feedback: Measurement first makes every later change testable, though it delivers no model gain on its own.

**Decision — How do you validate the richer simulator?.** A better fit on known lengths proves little. What is your plan?

- **Hold out the longest lengths entirely** — It tests extrapolation, which is what you care about.
  - Advantages: Closest to real use. Exposes over-fitting early.
  - Risks: Fewer points to judge by. Scores will look worse before they look better.
  - Validate by: Report error per length bucket with its spread.
  - Documented: not documented
  - Feedback: A stricter test that gives honest numbers, even if they are lower.
- **Re-fit on a random split of all lengths** — Fast, and it uses every measurement.
  - Advantages: Simple. Stable on familiar conditions.
  - Risks: Length leakage hides extrapolation error. Flatters the model.
  - Validate by: Check that no length appears on both sides of the split.
  - Documented: not documented
  - Feedback: Quick for iteration, but not a basis for the final claim.

**Decision — How far do you trust calibration?.** Calibration fixes bias, not missing physics.

- **Retrain online after every query** — The predictor stays current with live behaviour.
  - Advantages: Adapts to drift. No offline retraining step.
  - Risks: Noisy samples can destabilise it. Hard to reproduce a given prediction.
  - Validate by: Track error over time and version each predictor.
  - Documented: not documented
  - Feedback: Adaptive, but harder to audit.
- **Freeze the fit and report its valid range** — A predictor with a stated range is honest and testable.
  - Advantages: Reproducible. Failure modes are explicit.
  - Risks: Goes stale as hardware or software changes.
  - Validate by: Publish the supported range alongside every prediction.
  - Documented: not documented
  - Feedback: Less impressive, but it tells users when not to trust the number.

**Decision — How do you run the benchmark?.** Latency measurements are noisy by nature.

- **Repeat runs and report percentiles** — Medians and tails show the real distribution.
  - Advantages: Robust to outliers. Reveals jitter.
  - Risks: More time per data point.
  - Validate by: Pin the hardware and report p50 and p95.
  - Documented: not documented
  - Feedback: Slower, but the numbers can be trusted.
- **Take one run per configuration** — Covers more configurations in the same time.
  - Advantages: Broad coverage. Cheap.
  - Risks: One slow run can look like a trend. Differences vanish inside the noise.
  - Validate by: Re-run the surprising points before drawing conclusions.
  - Documented: not documented
  - Feedback: Wide but fragile. Treat any surprise as a prompt to re-measure.

**Ending — Debrief: the simulator.** You fixed the model, then chose how hard to test it.
- Fixing the model beats patching its output, if you can afford it.
- Test extrapolation, not interpolation.
- A split without length leakage matters as much as the change.
_Caution: This path is hypothetical. The documented results do not show what it would do._

**Ending — Debrief: calibration.** You leaned on calibration and decided how far to trust it.
- Calibration absorbs bias and cannot supply missing physics.
- State the range where the predictor is valid.
- Adaptive systems need versioning to stay auditable.
_Caution: This path is hypothetical. The calibration ablation is documented, but not as a result of this choice._

**Ending — Debrief: measure first.** You invested in measurement before modelling.
- Measurements make later changes comparable.
- Report percentiles, not single runs.
- Diagnosis is valuable even when it ships no model gain.
_Caution: This path is hypothetical and no result is claimed for it._

### Security scanner flooded with false alarms
*Project: Perry — Automated Web Security Scanner*

Your web security scanner runs 12 testing modules over static analysis and headless-Chromium crawling. Reports are noisy: some findings cannot be reproduced and users are starting to ignore them. You have one sprint. Where do you invest it?

**Decision — Choose the sprint focus.** Unreproducible findings erode trust. Which lever do you pull first?

- **Strengthen exploit validation** — Re-check each finding by replaying it and analysing the response before reporting it.
  - Advantages: Attacks false positives directly. Builds trust in every report.
  - Risks: Replays slow the scan. Over-strict checks can hide real bugs.
  - Validate by: Replay known-vulnerable test apps and count missed bugs as well as false alarms.
  - Documented: Anomaly-based validation to cut false positives is part of the project, but no rate is claimed.
  - Feedback: The direct fix. The cost is speed and the risk of discarding real findings.
- **Improve risk scoring and confidence** — Rank findings so users read the likely ones first instead of silencing everything.
  - Advantages: No findings are dropped. Fits how analysts triage.
  - Risks: Hides the noise instead of removing it. A bad score is worse than none.
  - Validate by: Check that high-confidence findings are the ones analysts confirm.
  - Documented: Deterministic scoring with independent coverage and confidence metrics is part of the project.
  - Feedback: Good for triage, but it leaves the underlying false positives in place.
- **Widen crawl coverage first** — Missing endpoints is the other failure, so reduce blind spots before tuning precision.
  - Advantages: Finds more real issues. Gives the validator more to learn from.
  - Risks: More surface adds more noise. Crawls take longer and cost more.
  - Validate by: Report endpoints and parameters found per site against a manual map.
  - Documented: Headless-Chromium crawling to map endpoints and parameters is part of the project.
  - Feedback: Raises recall, usually at precision cost. Decide which error hurts more.

**Decision — How strict is the validator?.** Strictness trades missed bugs for fewer false alarms.

- **Report only findings that reproduce twice** — Reports become highly trustworthy.
  - Advantages: Few false positives. Easy to explain to users.
  - Risks: Misses flaky or timing-dependent bugs.
  - Validate by: Measure recall on a known-vulnerable suite.
  - Documented: not documented
  - Feedback: Trusted reports, with a blind spot for intermittent issues.
- **Report everything, tagged by how well it reproduced** — Nothing is hidden and users see the evidence.
  - Advantages: No silent misses. Evidence travels with each finding.
  - Risks: Reports are longer. Users may skip the tags.
  - Validate by: Check that reproduced findings are read first.
  - Documented: not documented
  - Feedback: Honest and complete, but it asks more of the reader.

**Decision — What drives the score?.** A score is only as good as its inputs.

- **Score on evidence strength: reproduction, response change, payload** — Inputs anyone can inspect.
  - Advantages: Deterministic and auditable. Explains itself.
  - Risks: Hand-tuned weights drift from reality.
  - Validate by: Compare scores with analyst verdicts on past scans.
  - Documented: not documented
  - Feedback: Transparent and easy to defend, if you keep checking it against outcomes.
- **Train a model on past analyst verdicts** — It learns what analysts actually confirm.
  - Advantages: Adapts to your data. Can capture subtle patterns.
  - Risks: Needs labelled history. Opaque to the people who rely on it.
  - Validate by: Hold out whole sites and report calibration, not only accuracy.
  - Documented: not documented
  - Feedback: Powerful with enough labels, but harder to explain and to trust.

**Decision — How do you grow coverage?.** More surface means more to test and more to get wrong.

- **Crawl authenticated areas** — Real apps hide most functionality behind a login.
  - Advantages: Reaches the riskiest code. More realistic.
  - Risks: Needs credential handling. Can change state in the target app.
  - Validate by: Use a disposable test account and a reset step.
  - Documented: not documented
  - Feedback: High value and high responsibility. Scope and consent come first.
- **Improve single-page-app and JavaScript crawling** — Modern front ends hide endpoints behind client-side routing.
  - Advantages: Finds endpoints plain crawlers miss. Uses the headless browser already in place.
  - Risks: Slower scans. Dynamic pages produce duplicate URLs.
  - Validate by: Deduplicate by route and report the number of new endpoints found.
  - Documented: not documented
  - Feedback: A natural use of headless Chromium, as long as it does not flood the target.

**Ending — Debrief: validation.** You traded recall for trust and decided how strict to be.
- Count missed bugs, not only false alarms.
- Reproduction is the cheapest strong evidence.
- Strictness is a product decision, not just an engineering one.
_Caution: This path is hypothetical. No false-positive rate is documented._

**Ending — Debrief: scoring.** You improved triage without removing findings.
- Scoring helps the reader and leaves the noise.
- Inspectable inputs beat opaque ones for security tooling.
- Check scores against analyst verdicts.
_Caution: This path is hypothetical and no scoring experiment is documented._

**Ending — Debrief: coverage.** You widened what the scanner can see.
- Coverage and precision pull against each other.
- Deeper crawling needs scope control and consent.
- Report found against a known map, not in the abstract.
_Caution: This path is hypothetical and no coverage experiment is documented._

## Contact
- Email: mathurkabir336@gmail.com
- LinkedIn: https://linkedin.com/in/kabir-2005-Mathur
- GitHub: https://github.com/kabir-999
- Resume: `public/Kabir_Mathur_Resume.pdf`

npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build at http://localhost:4173
```

## Run locally

```bash
node -v            # 24 or newer
npm install
npm run dev        # http://localhost:5173
```

## Verify

```bash
npm run typecheck  # TypeScript project build (no emit)
npm run lint       # ESLint
npm test           # Vitest + Testing Library (data integrity + UI behaviour)
npm run build      # typecheck + production build into dist/
```

## Deploy to Vercel

**Option A — Git (recommended)**
1. Push this folder to a GitHub repository.
2. In Vercel: *Add New → Project → Import* the repo.
3. Vercel detects Vite automatically (`vercel.json` is included: `npm ci`, `npm run build`, output `dist`, long-lived cache headers for assets). `package.json` pins `engines.node` to 24+, so set **Node.js 24.x** under Project Settings if it is not picked up. Click **Deploy**.

**Option B — CLI**
```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

The app is a single-page client app. Section links use hash URLs (`/#squad`, `/#career`, …), so no rewrite rules are needed.

## Where content lives (edit data, not components)

| What | File |
| --- | --- |
| Projects / "players" (all profile fields) | `src/data/projects.ts` |
| Formation presets and slot coordinates | `src/data/formations.ts` |
| Manager, education, contact, tech stack, timeline, trophies, metrics | `src/data/club.ts` |
| Branching scenarios | `src/data/scenarios.ts` |
| All types | `src/types.ts` |

Player identity (`projects.ts`) is separate from positions (`formations.ts`); each formation slot only references a project id. A slot with `projectId: null` renders as an "Open slot".

## Content provenance (nothing invented)

Content comes from Kabir's resume, the portfolio site's profile data (`kabir-portfolio-management`), the public GitHub profile README and the product brief. Photos in `public/photos/` are from the portfolio site.

Each fact has one home: dated events on the Career timeline, certificates and team trophies in the trophy cabinet, project detail and numbers in Squad profiles, aggregate views on Club Profile.

- **From the GitHub profile:** name, headline, education, CGPA, L&T trainee role, tech stack, contact links, recognition and certifications, and the four featured projects (ChainPay, Perry, SafeGuard AI, Real-Time AQI) with their bullets, links, and the 0.724 mAP / 6 classes / 12 modules figures.
- **From the brief:** the other six projects (drone detection, face anti-spoofing, crop disease, real estate, artifact identifier, law summarizer), their stated technologies, and the four drone-detection metrics.
- **Placeholders:** any field typed `string | null` that is `null` renders as "Placeholder — not yet documented". The ten documented projects fill eleven positions, 

### Things to fill in when you have them
- For every project: *problem*, *my contribution*, *challenges*, *limitations and lessons learned*, public links.
- Dates for certifications, L&T start date, and project dates.
- Student-leadership milestones (none were supplied, so none are shown).
- Future ambitions (a visible placeholder on the Club Profile).
- Confirm whether "Perry" and "Sentinel" are the same project (currently noted as "also referred to as Sentinel in the project brief").
- Source note: your live portfolio (`kabir999.vercel.app`) is client-rendered and could not be read, so the GitHub profile was used instead.

## Storage & privacy
`localStorage` holds only non-sensitive preferences (intro seen, chosen formation, reduced-motion) and exploration progress. Malformed or unavailable storage is handled gracefully (a console warning is logged and defaults are used).

## Accessibility notes
Semantic landmarks, skip link, visible focus rings, native radio groups for formation and scenario choices, native `<dialog>` for the mobile profile sheet (focus trap, Escape, focus return), `prefers-reduced-motion` support plus an in-app toggle, and ≥44px touch targets for markers and navigation.
