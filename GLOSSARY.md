# Laboratory

Personal productivity tool: time Tasks against the expectations of their Activity and reflect on how the day went.

## Work

**Activity**:
A reusable kind of work with an Expected Time and a Max Time, grouped under a Category.
_Avoid_: Job, type

**Task**:
One occurrence of an Activity. Is Scheduled, In Progress or Completed.
_Avoid_: Entry, item

**Scheduled Task**:
A Task queued for later, not yet started.
_Avoid_: Planned task, todo

**Completed Task**:
A Task with a start and end time.
_Avoid_: Done task, finished task

**Expected Time**:
How long an Activity should take.
_Avoid_: Estimate, target

**Max Time**:
The longest an Activity may take before it counts as Over.
_Avoid_: Limit, cap

## Planning

**Expected Start**:
When a Scheduled Task should begin: right after the Task before it, given its Expected Time.
_Avoid_: EST, ETA, estimated start

**Day Window**:
A user's usual Day Start and Day End for one day of the week (Monday to Sunday). Either may be unset.
_Avoid_: Schedule, schedule preferences, waking hours

**Day Start**:
When a user's day usually begins on a given day of the week. Anchors the first Expected Start of a future date's Scheduled Tasks.
_Avoid_: Wake time

**Day End**:
When a user's day usually ends on a given day of the week. Never past midnight, and later than the Day Start when both are set.
_Avoid_: Bedtime, sleep time

**Start Override**:
A one-off replacement for the Day Start of a single future date.
_Avoid_: Custom start, date start

## Performance

**Performance Delta**:
Minutes won (positive) or lost (negative) by one Completed Task versus its Expected Time.
_Avoid_: Score, diff

**Performance Tier**:
Classification of a delta: Ahead, On Time, Late (lost but within Max Time) or Over (beyond Max Time).
_Avoid_: Grade, status

**Net Delta**:
Sum of Performance Deltas across a set of Completed Tasks.
_Avoid_: Net minutes, balance

**Performance Summary**:
Count of Completed Tasks plus their Net Delta and its Performance Tier. For a summary, any loss is Over; Late applies only to a single Task.
_Avoid_: Stats, totals

**Motivational Message**:
Short phrase shown with Today's Performance Summary, reacting to how the day is going.
_Avoid_: Motivation text, tagline

**Day Phase**:
Part of the day by clock time: Morning, Afternoon, Evening or Night. Night runs past midnight until Morning.
_Avoid_: Time slot, period

**Net Band**:
How good or bad a day's Net Delta is: Outstanding, Steady, Behind or Far Behind. Finer than the Performance Tier, and only used to pick a Motivational Message.
_Avoid_: Level, grade

**Day Outcome**:
How the day ended at Night: On Track (Net Delta even or ahead) or Off Track (behind).
_Avoid_: Result, verdict

**Milestone**:
A round number of Completed Tasks reached today, celebrated by the Motivational Message.
_Avoid_: Goal, achievement

**Pace Trend**:
Whether the latest Completed Tasks are doing better (Speeding Up) or worse (Slowing Down) than the earlier ones, judged by average Performance Delta.
_Avoid_: Momentum, velocity
