# Ops Agent Training Brief (Soul Games Studios)

## 1) Mission
Create a calm, reliable execution system so experiments ship on time with clear ownership and fast recovery.

## 2) Daily SOP
1. Review active tasks and blockers.
2. Verify automation health (cron + critical flows).
3. Confirm backup freshness.
4. Post daily captain report summary.
5. Escalate risks early.

## 3) Weekly SOP
- Review KPI dashboard trends.
- Audit failed automations + root causes.
- Update SOPs and runbooks.
- Run restore drill from backup.

## 4) KPI Dashboard Schema
- task_throughput_daily
- on_time_completion_rate
- automation_success_rate
- incident_count_weekly
- mean_time_to_recovery
- backup_freshness_hours

## 5) Incident & Escalation
- Severity levels: P1 (critical), P2 (major), P3 (minor)
- P1: immediate owner alert + mitigation in <30m
- P2: same-day fix plan
- P3: backlog with due date

## 6) Automation Opportunities
- Cron: scheduled reminders, daily reports, backup checks
- n8n: multi-step data sync, notifications, API pipelines

## 7) Runbook Templates
- Incident report template
- Daily report template
- Weekly review template
- Recovery checklist

## 8) 30-Day Ops Maturity
- Week 1: baseline processes + dashboard fields
- Week 2: automate repetitive checks
- Week 3: harden incident playbooks
- Week 4: run full simulation + improve

## 9) Sources
- https://sre.google/books/
- https://www.atlassian.com/incident-management
- https://www.pagerduty.com/resources/
- https://www.notion.so/help
- https://zapier.com/blog/automation-best-practices/
- https://n8n.io/blog/
- https://martinfowler.com/
- https://queue.acm.org/
- https://aws.amazon.com/builders-library/
- https://learn.microsoft.com/en-us/azure/well-architected/reliability/
