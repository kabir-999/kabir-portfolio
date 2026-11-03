import type { Scenario, ScenarioChoice, ScenarioNode } from '../types'

type C = [id: string, label: string, why: string, adv: string[], risks: string[], validation: string[], documented: string | null, feedback: string, next: string]
const choice = ([id, label, why, advantages, risks, validation, documented, feedback, next]: C): ScenarioChoice => ({ id, label, why, advantages, risks, validation, documented, feedback, next })
const decision = (id: string, title: string, prompt: string, choices: C[]): ScenarioNode => ({ kind: 'decision', id, title, prompt, choices: choices.map(choice) })
const debrief = (id: string, title: string, summary: string, takeaways: string[], caution: string): ScenarioNode => ({ kind: 'debrief', id, title, summary, takeaways, caution })

const NOT_DOCUMENTED = 'No experiment on this approach is documented in the project data, so nothing is claimed about its effect.'

/**
 * Typed scenario graph: decision nodes branch via `choice.next`; debrief nodes end a path.
 * Every consequence is hypothetical. These are reasoning exercises, not measured outcomes.
 */
export const scenarios: Scenario[] = [
  /* ------------------------------------------------------------------ */
  {
    id: 'drone-noise',
    title: 'Drone detection in noisy environments',
    projectId: 'drone',
    context:
      'A drone audio classification system becomes less reliable when the drone is far from the microphone and its signal resembles ambient noise. The documented pipeline uses spectral features, background calibration and XGBoost, and its drone recall (86.2%) trails its non-drone recall (98.5%). You have one sprint. Where do you invest it?',
    startNodeId: 'root',
    nodes: {
      root: {
        kind: 'decision',
        id: 'root',
        title: 'Choose the sprint focus',
        prompt: 'Missed distant drones are the main failure mode. Which lever do you pull first?',
        choices: [
          {
            id: 'spectral',
            label: 'Improve spectral feature extraction and background calibration',
            why: 'If the drone signature is faint but present, better features and a better estimate of the local noise floor could make it separable.',
            advantages: ['Targets the root cause: low signal-to-noise at range.', 'Cheap to iterate on existing recordings.', 'Builds on the pipeline that already exists.'],
            risks: ['Features tuned to the recording sites may not transfer to new ones.', 'Calibration adds a step that can drift in the field.'],
            validation: ['Compare drone recall at matched false-alarm rates before and after.', 'Evaluate on recordings from sites not used to design the features.'],
            documented:
              'Spectral features and background calibration are already part of the evaluated pipeline. The documented results do not isolate how much each component contributes, so this choice is not claimed to be proven.',
            feedback: 'A reasonable first move because it attacks the signal itself. The danger is quietly optimising for the sites you already have.',
            next: 'spectral-validate',
          },
          {
            id: 'temporal',
            label: 'Increase temporal integration',
            why: 'A faint but persistent tone is easier to confirm over several seconds than in one short window.',
            advantages: ['Averaging suppresses random noise.', 'Can reduce flickering predictions.'],
            risks: ['Adds detection latency.', 'Can blur short or intermittent signatures.', 'Does not help if the signal is genuinely absent.'],
            validation: ['Plot recall against window length at a fixed false-alarm rate.', 'Measure time-to-detection on approaching drones.'],
            documented: NOT_DOCUMENTED,
            feedback: 'Powerful when the signal is persistent, but it trades speed for confidence, and some applications cannot afford that.',
            next: 'temporal-window',
          },
          {
            id: 'data',
            label: 'Collect and evaluate more challenging ambient recordings',
            why: 'Failures at range may reflect training data that never contained the hard cases.',
            advantages: ['Exposes failure modes honestly.', 'Improves the evaluation, not just the model.'],
            risks: ['Slow and costly to collect.', 'Labelling distant drones is hard.', 'No improvement is guaranteed.'],
            validation: ['Build a held-out hard-case test set before any retraining.', 'Report results per distance and noise condition.'],
            documented: NOT_DOCUMENTED,
            feedback: 'Slower, but it makes every later decision more trustworthy. Better data often beats a cleverer model.',
            next: 'data-structure',
          },
        ],
      },
      'spectral-validate': {
        kind: 'decision',
        id: 'spectral-validate',
        title: 'Suppose the new features look better. How do you check?',
        prompt: 'Improvements on familiar data can be an illusion. What is your validation plan?',
        choices: [
          {
            id: 'held-out-site',
            label: 'Hold out entire recording sites for testing',
            why: 'It tests whether the features generalise to places the model has not heard.',
            advantages: ['Closest to real deployment.', 'Reveals calibration drift.'],
            risks: ['Needs enough distinct sites.', 'Results will have higher variance.'],
            validation: ['Report per-site recall and its spread.'],
            documented: null,
            feedback: 'A stricter test that gives more honest numbers, even if they are lower.',
            next: 'debrief-spectral',
          },
          {
            id: 'pooled-random',
            label: 'Re-tune on the pooled data with a random split',
            why: 'It is fast and uses all the data you have.',
            advantages: ['Simple.', 'Stable estimates on familiar conditions.'],
            risks: ['Clips from the same session can appear in both train and test, inflating scores.', 'Hides site-specific failure.'],
            validation: ['Check whether near-duplicate clips cross the split.'],
            documented: null,
            feedback: 'Quick, but easily over-optimistic. Use it for iteration, not for the final claim.',
            next: 'debrief-spectral',
          },
        ],
      },
      'temporal-window': {
        kind: 'decision',
        id: 'temporal-window',
        title: 'How do you set the integration window?',
        prompt: 'Longer windows buy confidence and cost latency.',
        choices: [
          {
            id: 'fixed-long',
            label: 'Use a fixed, longer window',
            why: 'Predictable behaviour and easy to reason about.',
            advantages: ['Simple to implement and test.', 'Stable latency.'],
            risks: ['Penalises easy, loud detections with unnecessary delay.'],
            validation: ['Sweep window length and report the recall/latency curve.'],
            documented: null,
            feedback: 'Easy to ship, but it applies the same delay to easy and hard cases alike.',
            next: 'debrief-temporal',
          },
          {
            id: 'adaptive',
            label: 'Accumulate evidence adaptively until confident',
            why: 'Obvious drones are flagged quickly while ambiguous ones get more time.',
            advantages: ['Better latency on clear cases.', 'Spends time only where needed.'],
            risks: ['More complex to tune and test.', 'Variable latency can surprise operators.'],
            validation: ['Report the distribution of time-to-detection, not just its mean.'],
            documented: null,
            feedback: 'More efficient in principle, but the behaviour is harder to specify and verify.',
            next: 'debrief-temporal',
          },
        ],
      },
      'data-structure': {
        kind: 'decision',
        id: 'data-structure',
        title: 'How do you collect the new recordings?',
        prompt: 'Hard recordings are expensive. How do you plan them?',
        choices: [
          {
            id: 'matrix',
            label: 'Plan a systematic distance × noise-condition matrix',
            why: 'Controlled coverage lets you see exactly where performance breaks.',
            advantages: ['Interpretable per-condition results.', 'Reproducible.'],
            risks: ['Controlled sessions can differ from real-world messiness.'],
            validation: ['Report recall per cell of the matrix.'],
            documented: null,
            feedback: 'Great for diagnosis. Pair it with some uncontrolled data so the lab does not become the world.',
            next: 'debrief-data',
          },
          {
            id: 'opportunistic',
            label: 'Gather opportunistic field recordings',
            why: 'Real conditions, collected cheaply.',
            advantages: ['Realistic.', 'Low setup cost.'],
            risks: ['Uneven coverage.', 'Hard to know what is missing.', 'Labels may be noisy.'],
            validation: ['Audit the label quality and the condition mix before using the data.'],
            documented: null,
            feedback: 'Realistic but patchy. You may learn less about why failures happen.',
            next: 'debrief-data',
          },
        ],
      },
      'debrief-spectral': {
        kind: 'debrief',
        id: 'debrief-spectral',
        title: 'Debrief: features and calibration',
        summary: 'You improved the signal representation, then chose how strictly to test it.',
        takeaways: [
          'Feature work attacks the cause, but generalisation across sites is the real test.',
          'A leakage-free split matters as much as the feature change itself.',
          'Judge changes at matched false-alarm rates so recall gains are not bought with false alarms.',
        ],
        caution: 'This path is hypothetical. The documented results (86.2% drone recall, 98.5% non-drone recall) do not show what this change would do.',
      },
      'debrief-temporal': {
        kind: 'debrief',
        id: 'debrief-temporal',
        title: 'Debrief: temporal integration',
        summary: 'You traded latency for confidence and decided how to spend that delay.',
        takeaways: [
          'Integration helps persistent signals and cannot rescue absent ones.',
          'Whether the latency is acceptable is a product decision, not just a modelling one.',
          'Report time-to-detection alongside recall.',
        ],
        caution: 'This path is hypothetical and no temporal-integration experiment is documented.',
      },
      'debrief-data': {
        kind: 'debrief',
        id: 'debrief-data',
        title: 'Debrief: harder data',
        summary: 'You invested in measurement before modelling.',
        takeaways: [
          'A trustworthy hard-case test set makes every later change comparable.',
          'Structured coverage explains failures; opportunistic coverage reveals surprises.',
          'Data work can be slower and still be the highest-leverage choice.',
        ],
        caution: 'This path is hypothetical and no additional-data experiment is documented.',
      },
    },
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'face-antispoof',
    title: 'Face anti-spoofing under unseen attacks',
    projectId: 'faceas',
    context:
      'A face anti-spoofing model (depth estimation with ResNet18) has imperfect evaluation performance and may fail to generalise to unseen attack types. What do you do first?',
    startNodeId: 'root',
    nodes: {
      root: {
        kind: 'decision',
        id: 'root',
        title: 'Choose the first investigation',
        prompt: 'The model is imperfect and brittle to new attacks. Where do you start?',
        choices: [
          {
            id: 'diversity',
            label: 'Improve dataset diversity and split design',
            why: 'If the model only sees a few attack styles, it can only learn those. How you split the data also decides whether your evaluation is honest.',
            advantages: ['Attacks the generalisation problem directly.', 'Improves evaluation validity.'],
            risks: ['Collecting new attack types is expensive.', 'Stricter splits lower the headline score.'],
            validation: ['Measure performance on attack types held out of training entirely.'],
            documented:
              'The project uses depth estimation with ResNet18 and has imperfect evaluation performance. Dataset or split experiments are not documented here.',
            feedback: 'The most direct answer to "may fail on unseen attacks" because it changes what the model sees and how you measure it.',
            next: 'split-design',
          },
          {
            id: 'imbalance',
            label: 'Investigate class imbalance and decision thresholds',
            why: 'Real and spoof samples are rarely balanced, and a default 0.5 threshold may be a poor operating point.',
            advantages: ['Cheap, because no new data is needed.', 'Often changes behaviour noticeably.'],
            risks: ['Can look like progress without improving generalisation.', 'Thresholds tuned on one set may not transfer.'],
            validation: ['Report error rates across the full range of thresholds, not one point.'],
            documented: NOT_DOCUMENTED,
            feedback: 'A sensible low-cost check, but remember it tunes the operating point and does not teach the model new attacks.',
            next: 'operating-point',
          },
          {
            id: 'signals',
            label: 'Evaluate complementary visual or depth-based signals',
            why: 'Different cues (texture, frequency patterns, depth) fail in different ways, so combining them could be more robust.',
            advantages: ['Diversifies failure modes.', 'May catch attacks one cue misses.'],
            risks: ['More complexity, latency and maintenance.', 'Added signals can overfit the same dataset.'],
            validation: ['Run an ablation: each signal alone versus combined, on held-out attack types.'],
            documented:
              'Depth estimation is already part of the project. Whether additional signals were tested is not documented.',
            feedback: 'Promising for robustness, but only worth the complexity if an ablation shows the signals contribute differently.',
            next: 'fusion',
          },
        ],
      },
      'split-design': {
        kind: 'decision',
        id: 'split-design',
        title: 'How do you split the data?',
        prompt: 'The split determines what your score actually means.',
        choices: [
          {
            id: 'leave-attack-out',
            label: 'Hold out whole attack types for testing',
            why: 'It directly simulates meeting a new attack in deployment.',
            advantages: ['Honest generalisation estimate.'],
            risks: ['Scores will be lower and noisier.', 'Needs enough distinct attack types.'],
            validation: ['Report per-attack-type results, not just an average.'],
            documented: null,
            feedback: 'The harshest and most informative test of the stated worry.',
            next: 'debrief-diversity',
          },
          {
            id: 'subject-disjoint',
            label: 'Split by subject (identity) only',
            why: 'Prevents the same person appearing in train and test.',
            advantages: ['Removes identity leakage.', 'Easy to apply.'],
            risks: ['Says nothing about unseen attack types.'],
            validation: ['Check that performance holds across demographic and device groups.'],
            documented: null,
            feedback: 'Necessary hygiene, but not sufficient for the unseen-attack question.',
            next: 'debrief-diversity',
          },
        ],
      },
      'operating-point': {
        kind: 'decision',
        id: 'operating-point',
        title: 'How do you choose the operating point?',
        prompt: 'Different mistakes cost different things: letting an attacker in versus blocking a real user.',
        choices: [
          {
            id: 'tune-threshold',
            label: 'Choose a threshold on validation data for a target error trade-off',
            why: 'It makes the security versus convenience trade-off an explicit decision.',
            advantages: ['Explicit and auditable.', 'No retraining needed.'],
            risks: ['Needs a validation set that resembles deployment.'],
            validation: ['Confirm the chosen threshold on a separate test set.'],
            documented: null,
            feedback: 'Turns an implicit default into a deliberate choice.',
            next: 'debrief-threshold',
          },
          {
            id: 'reweight',
            label: 'Reweight classes in the loss and keep the default threshold',
            why: 'It encourages the model itself to pay attention to the rarer class.',
            advantages: ['Changes what is learned, not just how it is read.'],
            risks: ['Needs retraining.', 'Can shift calibration unpredictably.'],
            validation: ['Compare calibration and error rates against the baseline.'],
            documented: null,
            feedback: 'Reasonable, but you still eventually need to decide where to put the threshold.',
            next: 'debrief-threshold',
          },
        ],
      },
      fusion: {
        kind: 'decision',
        id: 'fusion',
        title: 'How do you combine signals?',
        prompt: 'More than one cue means deciding how they vote.',
        choices: [
          {
            id: 'late',
            label: 'Late fusion: train separately, combine scores',
            why: 'Each model can be tested and replaced independently.',
            advantages: ['Modular.', 'Easy to ablate.'],
            risks: ['May miss interactions between cues.'],
            validation: ['Compare fused versus single-signal performance on held-out attacks.'],
            documented: null,
            feedback: 'Easier to debug, which matters while you are still learning what works.',
            next: 'debrief-signals',
          },
          {
            id: 'early',
            label: 'Early fusion: one model sees all signals together',
            why: 'The model can learn interactions between cues.',
            advantages: ['Potentially stronger joint features.'],
            risks: ['Harder to attribute what helps.', 'More data hungry.'],
            validation: ['Ablate input channels to confirm each one contributes.'],
            documented: null,
            feedback: 'Higher ceiling, less transparency, and a harder path to explaining failures.',
            next: 'debrief-signals',
          },
        ],
      },
      'debrief-diversity': {
        kind: 'debrief',
        id: 'debrief-diversity',
        title: 'Debrief: data and splits',
        summary: 'You worked on both what the model sees and how honestly it is judged.',
        takeaways: [
          'For unseen-attack risk, the split design is the experiment.',
          'A lower, honest score beats a higher, leaky one.',
          'Report results per attack type, not only an average.',
        ],
        caution: 'This path is hypothetical. No dataset or split experiment is documented for the project.',
      },
      'debrief-threshold': {
        kind: 'debrief',
        id: 'debrief-threshold',
        title: 'Debrief: imbalance and thresholds',
        summary: 'You examined how the model is read, not what it knows.',
        takeaways: [
          'A threshold is a product decision about acceptable risk.',
          'Operating-point tuning does not by itself fix generalisation.',
          'Always confirm on data the tuning never touched.',
        ],
        caution: 'This path is hypothetical. No threshold or imbalance experiment is documented.',
      },
      'debrief-signals': {
        kind: 'debrief',
        id: 'debrief-signals',
        title: 'Debrief: complementary signals',
        summary: 'You explored diversifying the evidence behind each decision.',
        takeaways: [
          'Complementary cues help only if they fail differently.',
          'Ablations are what justify added complexity.',
          'Modularity trades some accuracy potential for debuggability.',
        ],
        caution: 'This path is hypothetical. Fusion experiments beyond depth estimation are not documented.',
      },
    },
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'twinformer-latency',
    title: 'Latency twin drifting at long sequences',
    projectId: 'twinformer',
    context:
      'Your Transformer latency digital twin pairs a physics-based simulator with a calibrated Ridge predictor, validated on a held-out sequence-length split. Error grows at the longest sequences, where memory traffic and the KV cache start to dominate. You have one sprint. Where do you invest it?',
    startNodeId: 'root',
    nodes: {
      root: decision('root', 'Choose the sprint focus', 'Predictions drift at long sequence lengths. Which lever do you pull first?', [
        ['physics', 'Refine the physics-based simulator', 'If the simulator misses memory-bound behaviour, no calibration layer can fully repair it.', ['Fixes the cause, not the symptom.', 'Helps every architecture, not one fit.'], ['Hardware modelling is detailed work.', 'A richer model can overfit the devices you measured.'], ['Compare error per sequence-length bucket before and after.', 'Keep the held-out length split untouched.'], 'The simulator and calibrated predictor are both documented, but their individual contributions are not isolated here.', 'The principled fix, at the cost of modelling effort and a risk of over-fitting to one device.', 'physics-next'],
        ['calibrate', 'Strengthen the calibrated Ridge predictor', 'Calibration is cheap and can absorb systematic error the simulator leaves behind.', ['Fast to retrain and test.', 'Online updates keep it current.'], ['Can mask simulator errors rather than fix them.', 'Extrapolates poorly beyond the lengths it was fitted on.'], ['Evaluate only on sequence lengths longer than any in the fit set.'], 'A calibration ablation and an online retraining loop are part of the project, but no figure is claimed for this change.', 'Cheap and effective on familiar ranges, but it is the first thing to break outside them.', 'calibrate-next'],
        ['kv', 'Benchmark KV-cache reuse versus recompute at long lengths', 'The KV cache is where long-sequence latency diverges, so measure it directly.', ['Grounds the model in real measurements.', 'Shows which regime the twin gets wrong.'], ['Benchmarks are hardware-specific.', 'Diagnoses the error without fixing it.'], ['Report latency per length with variance across repeated runs.'], 'A KV-cache reuse versus recompute study is part of the project; this path is not a measured result.', 'Measurement first makes every later change testable, though it delivers no model gain on its own.', 'kv-next'],
      ]),
      'physics-next': decision('physics-next', 'How do you validate the richer simulator?', 'A better fit on known lengths proves little. What is your plan?', [
        ['hold-lengths', 'Hold out the longest lengths entirely', 'It tests extrapolation, which is what you care about.', ['Closest to real use.', 'Exposes over-fitting early.'], ['Fewer points to judge by.', 'Scores will look worse before they look better.'], ['Report error per length bucket with its spread.'], null, 'A stricter test that gives honest numbers, even if they are lower.', 'debrief-physics'],
        ['random-split', 'Re-fit on a random split of all lengths', 'Fast, and it uses every measurement.', ['Simple.', 'Stable on familiar conditions.'], ['Length leakage hides extrapolation error.', 'Flatters the model.'], ['Check that no length appears on both sides of the split.'], null, 'Quick for iteration, but not a basis for the final claim.', 'debrief-physics'],
      ]),
      'calibrate-next': decision('calibrate-next', 'How far do you trust calibration?', 'Calibration fixes bias, not missing physics.', [
        ['retrain-online', 'Retrain online after every query', 'The predictor stays current with live behaviour.', ['Adapts to drift.', 'No offline retraining step.'], ['Noisy samples can destabilise it.', 'Hard to reproduce a given prediction.'], ['Track error over time and version each predictor.'], null, 'Adaptive, but harder to audit.', 'debrief-calibrate'],
        ['fixed-fit', 'Freeze the fit and report its valid range', 'A predictor with a stated range is honest and testable.', ['Reproducible.', 'Failure modes are explicit.'], ['Goes stale as hardware or software changes.'], ['Publish the supported range alongside every prediction.'], null, 'Less impressive, but it tells users when not to trust the number.', 'debrief-calibrate'],
      ]),
      'kv-next': decision('kv-next', 'How do you run the benchmark?', 'Latency measurements are noisy by nature.', [
        ['repeat', 'Repeat runs and report percentiles', 'Medians and tails show the real distribution.', ['Robust to outliers.', 'Reveals jitter.'], ['More time per data point.'], ['Pin the hardware and report p50 and p95.'], null, 'Slower, but the numbers can be trusted.', 'debrief-kv'],
        ['single', 'Take one run per configuration', 'Covers more configurations in the same time.', ['Broad coverage.', 'Cheap.'], ['One slow run can look like a trend.', 'Differences vanish inside the noise.'], ['Re-run the surprising points before drawing conclusions.'], null, 'Wide but fragile. Treat any surprise as a prompt to re-measure.', 'debrief-kv'],
      ]),
      'debrief-physics': debrief('debrief-physics', 'Debrief: the simulator', 'You fixed the model, then chose how hard to test it.', ['Fixing the model beats patching its output, if you can afford it.', 'Test extrapolation, not interpolation.', 'A split without length leakage matters as much as the change.'], 'This path is hypothetical. The documented results do not show what it would do.'),
      'debrief-calibrate': debrief('debrief-calibrate', 'Debrief: calibration', 'You leaned on calibration and decided how far to trust it.', ['Calibration absorbs bias and cannot supply missing physics.', 'State the range where the predictor is valid.', 'Adaptive systems need versioning to stay auditable.'], 'This path is hypothetical. The calibration ablation is documented, but not as a result of this choice.'),
      'debrief-kv': debrief('debrief-kv', 'Debrief: measure first', 'You invested in measurement before modelling.', ['Measurements make later changes comparable.', 'Report percentiles, not single runs.', 'Diagnosis is valuable even when it ships no model gain.'], 'This path is hypothetical and no result is claimed for it.'),
    },
  },
  /* ------------------------------------------------------------------ */
  {
    id: 'perry-scanner',
    title: 'Security scanner flooded with false alarms',
    projectId: 'perry',
    context:
      'Your web security scanner runs 12 testing modules over static analysis and headless-Chromium crawling. Reports are noisy: some findings cannot be reproduced and users are starting to ignore them. You have one sprint. Where do you invest it?',
    startNodeId: 'root',
    nodes: {
      root: decision('root', 'Choose the sprint focus', 'Unreproducible findings erode trust. Which lever do you pull first?', [
        ['validate', 'Strengthen exploit validation', 'Re-check each finding by replaying it and analysing the response before reporting it.', ['Attacks false positives directly.', 'Builds trust in every report.'], ['Replays slow the scan.', 'Over-strict checks can hide real bugs.'], ['Replay known-vulnerable test apps and count missed bugs as well as false alarms.'], 'Anomaly-based validation to cut false positives is part of the project, but no rate is claimed.', 'The direct fix. The cost is speed and the risk of discarding real findings.', 'validate-next'],
        ['score', 'Improve risk scoring and confidence', 'Rank findings so users read the likely ones first instead of silencing everything.', ['No findings are dropped.', 'Fits how analysts triage.'], ['Hides the noise instead of removing it.', 'A bad score is worse than none.'], ['Check that high-confidence findings are the ones analysts confirm.'], 'Deterministic scoring with independent coverage and confidence metrics is part of the project.', 'Good for triage, but it leaves the underlying false positives in place.', 'score-next'],
        ['coverage', 'Widen crawl coverage first', 'Missing endpoints is the other failure, so reduce blind spots before tuning precision.', ['Finds more real issues.', 'Gives the validator more to learn from.'], ['More surface adds more noise.', 'Crawls take longer and cost more.'], ['Report endpoints and parameters found per site against a manual map.'], 'Headless-Chromium crawling to map endpoints and parameters is part of the project.', 'Raises recall, usually at precision cost. Decide which error hurts more.', 'coverage-next'],
      ]),
      'validate-next': decision('validate-next', 'How strict is the validator?', 'Strictness trades missed bugs for fewer false alarms.', [
        ['strict', 'Report only findings that reproduce twice', 'Reports become highly trustworthy.', ['Few false positives.', 'Easy to explain to users.'], ['Misses flaky or timing-dependent bugs.'], ['Measure recall on a known-vulnerable suite.'], null, 'Trusted reports, with a blind spot for intermittent issues.', 'debrief-validate'],
        ['tiered', 'Report everything, tagged by how well it reproduced', 'Nothing is hidden and users see the evidence.', ['No silent misses.', 'Evidence travels with each finding.'], ['Reports are longer.', 'Users may skip the tags.'], ['Check that reproduced findings are read first.'], null, 'Honest and complete, but it asks more of the reader.', 'debrief-validate'],
      ]),
      'score-next': decision('score-next', 'What drives the score?', 'A score is only as good as its inputs.', [
        ['evidence', 'Score on evidence strength: reproduction, response change, payload', 'Inputs anyone can inspect.', ['Deterministic and auditable.', 'Explains itself.'], ['Hand-tuned weights drift from reality.'], ['Compare scores with analyst verdicts on past scans.'], null, 'Transparent and easy to defend, if you keep checking it against outcomes.', 'debrief-score'],
        ['learned', 'Train a model on past analyst verdicts', 'It learns what analysts actually confirm.', ['Adapts to your data.', 'Can capture subtle patterns.'], ['Needs labelled history.', 'Opaque to the people who rely on it.'], ['Hold out whole sites and report calibration, not only accuracy.'], null, 'Powerful with enough labels, but harder to explain and to trust.', 'debrief-score'],
      ]),
      'coverage-next': decision('coverage-next', 'How do you grow coverage?', 'More surface means more to test and more to get wrong.', [
        ['auth', 'Crawl authenticated areas', 'Real apps hide most functionality behind a login.', ['Reaches the riskiest code.', 'More realistic.'], ['Needs credential handling.', 'Can change state in the target app.'], ['Use a disposable test account and a reset step.'], null, 'High value and high responsibility. Scope and consent come first.', 'debrief-coverage'],
        ['spa', 'Improve single-page-app and JavaScript crawling', 'Modern front ends hide endpoints behind client-side routing.', ['Finds endpoints plain crawlers miss.', 'Uses the headless browser already in place.'], ['Slower scans.', 'Dynamic pages produce duplicate URLs.'], ['Deduplicate by route and report the number of new endpoints found.'], null, 'A natural use of headless Chromium, as long as it does not flood the target.', 'debrief-coverage'],
      ]),
      'debrief-validate': debrief('debrief-validate', 'Debrief: validation', 'You traded recall for trust and decided how strict to be.', ['Count missed bugs, not only false alarms.', 'Reproduction is the cheapest strong evidence.', 'Strictness is a product decision, not just an engineering one.'], 'This path is hypothetical. No false-positive rate is documented.'),
      'debrief-score': debrief('debrief-score', 'Debrief: scoring', 'You improved triage without removing findings.', ['Scoring helps the reader and leaves the noise.', 'Inspectable inputs beat opaque ones for security tooling.', 'Check scores against analyst verdicts.'], 'This path is hypothetical and no scoring experiment is documented.'),
      'debrief-coverage': debrief('debrief-coverage', 'Debrief: coverage', 'You widened what the scanner can see.', ['Coverage and precision pull against each other.', 'Deeper crawling needs scope control and consent.', 'Report found against a known map, not in the abstract.'], 'This path is hypothetical and no coverage experiment is documented.'),
    },
  },
]

export const scenarioById = (id: string): Scenario | undefined => scenarios.find((s) => s.id === id)
