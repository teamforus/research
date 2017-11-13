POCs

"#todo translate to english"

- Workflow template #needs-review @Jamal
  "## Method
  
  ### Background / Context
  **Goal/user story:**
  
  **More info:**
  
  ### Hypothesis:
  
  **Other option:**
  
  ### Assignee: 
  
  ### Method
  *documentation/code*
  
  ### Resultaat
  *present findings*
  
  ### Recommendation
  *write recomendation*"
- POC: Signeren van data #cryptografie #3
  - iOS
  - Android
  - Browser
- POC: Generate a keypair on android
- POC: Authenticate on node with keypair in app > perform transactions without sending private key to server
- POC: (light)Client in app. Perform transactions locally
- POC: Interactie tussen smart contract en IPFS #data
- POC: Interactie tussen smart contract en swarm #data
- POC: Interactie tussen smart contract en data op client #data 
- POC: End-to-end encryptie en decryptie #cryptografie
  - iOS
  - Android
  - Browser
- POC: Tijdelijke toegang tot informatie op IPFS/Swarm
- POC: Validatie functie, volledig in ethereum smart contract
- POC: Validatie functie, ethereum smart contract + data in IPFS
- POC: Validatie functie, ethereum smart contract + data in Swarm
- POC: Validatie functie, end to end / off chain
- POC: Validatie functie met zero knowledge
  - ZKSnarks
- POC: Proxy contract voor herstellen van toegang tot identiteit
  - uPort bekijken
- POC: Proxy contract voor upgradability van smart contracts
- POC: Kosten: transacties / opslag
- POC: API design 
- POC: Contract migratie
  - Mogelijkheden vergelijken Truffle, Embark, .... #smart-contracts
  - welke voor- en nadelen hebben deze? #smart-contracts
- POC: Host frontend on IPFS
- POC: Host frontend on Swarm
- POC: Transactiekosten betalen voor ander contract
- Topics
  - #hashtags
    - #platformkeuze 
      "Aan het platform stellen we bepaalde eisen. We gaan onderzoeken en in kaart brengen welke platformen aan de eisen voldoen."
    - #privacy
      "[omschrijving van privacy doelstellingen]"
    - #identiteit 
    - #architectuur 
    - #decentrale-opslag 
    - #smart-contracts 
    - #validatie-functie 
    - #privacy-by-design 
    - #assurance-by-design
    - #front-end 
    - #schaalbaarheid
  - Waaraan moeten identiteiten voldoen om bruikbaar te blijven voor alle toepassingen op het platform? #identiteit #please-clearify
  - Hoe maak je de validator rol zo decentraal mogelijk? Wat is het incentivesysteem om validatoren te bewegen en eerlijk te houden? Wie valideert de validatoren? #validatie-functie #incentives
  - Hoe regel je tijdelijke toegang tot private informatie? Kun je een systeem verzinnen waarbij keys onbruikbaar worden gemaakt? #privacy-by-design
  - ZK-snarks (zero knowledge proofing) #privacy-by-design
    - wat houdt zero knowledge precies in? compleet begrip van mogelijkheden noodzakelijk. #privacy-by-design
    - Kan zk-snarks gebruikt worden voor vragen over alle type data, of alleen voor booleans? #privacy-by-design
  - Wat is er nodig om het platform GDPR-compliant by design te maken? #privacy-by-design
    - i.e.: zodanig inrichten dat aan front-end kant zo min mogelijk privacykeuzes gemaakt hoeven worden. #privacy-by-design
  - Hoe hou je rechten/toegang tot het platform up-to-date? Is er een manier om decentraal en automatisch toegang te blokkeren wanneer iemand bijvoorbeeld niet meer bij een partij werkt? #privacy-by-design
  - Het compleet decentraal laten functioneren van de front-end applicaties. #front-end
    - Wat is er nodig om de front-end ook compleet decentraal te maken? #front-end
    - Hoe wordt de front-end dan beheerd? #front-end
  - Kosten #schaalbaarheid
  - Kosten: transacties. Wie betaalt wat? #schaalbaarheid
  - wat zijn de kosten en baten van een blockchain-based systeem. #schaalbaarheid
  - baten: bijvoorbeeld besparen van serverkosten en onderhoud. #schaalbaarheid
  - Hoe ga je om met de huidige transactiesnelheid van Ethereum? Kunnen we bepaalde handelingen beter offchain doen? #schaalbaarheid
    - Computatie #schaalbaarheid
  - Hoe structureer je data in decentrale opslag? #decentrale-opslag
    - fundamenteel anders dan in conventionele database? #decentrale-opslag
    - welke mogelijkheden zijn er? IPFS/Swarm/..... #decentrale-opslag
  - Welke platformen voldoen aan welke vereisten?
    "grid met platformen en hoe het voldoet aan vereisten + tijdlijn/roadmap
    
    Wanneer kunnen we door naar de volgende fase?"
    - Platformen
      - Ethereum
      - Bitcoin
      - 
    - Vereisten
      - Open source community
      - Permissionless consensus algoritme
      - Schaalbaarheid
        - Truebit 
        - Plasma
        - Raiden
        - Sharding
      - Smart Contracts
        "Turing completeness?"
      - Betaalbaar (kosten)
  - Open source governance
    "https://opensource.guide"
    - Bestuur bestaande projecten
      - Rocket.Chat
      - Brave
      - Swift
  - Kan een client een node zijn? (light client)
