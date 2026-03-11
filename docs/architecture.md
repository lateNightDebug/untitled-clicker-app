# Untitled Clicker App architecture

Course project for CPRG 303-C Mobile Application Development 1

Created by Luna McCormick, Tessa Unrau, J Wales

---

## Table of Contents:

1. [Proposed Architecture](#proposed)
2. [Week 1](#week-1)

---

## Proposed Architecture: <a name="proposed">

### Start of project development choices:

---

Dev framework: React Native

Navigation strategy: Tabs and Stack

Hardware integration: Speaker

Database storage: combination of local unencrypted user data and remotely stored upgrade data

    ```
    Profile tab = folder with its own Stack (profile/)
    ├── Profile page (index.tsx)
    |   └── Simple user data (local/database)
    |
    ├── Upgrades tab = folder with its own Stack (upgrades/)
    |   └── Available upgrades (upgrades.tsx, api fetch required)
    |   └── User unlocked upgrades (index.tsx)
    |
    ├── Clicker tab = folder with its own Stack (clicker/)
    |   └── Clicker button
    ```

## Week 1 decisions and structure: <a name="week-1">

---

### Week 1 architecture:

---
