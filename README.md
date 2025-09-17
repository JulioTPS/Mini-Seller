# 🎯 Mini-Seller

A lightweight console to triage Leads and convert them into Opportunities.

![Mini-Seller Screenshot](https://github.com/user-attachments/assets/428122ae-4458-4f40-b474-4a0fa5af5e9b)

## Features

- **Lead Management**: View, add, edit, and delete leads with detailed information
- **Lead Scoring**: Score leads from 0-100 to prioritize sales efforts
- **Status Tracking**: Track lead status through the sales funnel (New → Contacted → Qualified → Converted)
- **Opportunity Conversion**: Convert qualified leads into sales opportunities
- **Responsive Design**: Modern, mobile-friendly interface with gradient styling
- **Data Persistence**: Automatically saves data to browser localStorage
- **Real-time Updates**: Dynamic counters and status updates

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/JulioTPS/Mini-Seller.git
cd Mini-Seller
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

### Production Build

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `build/` directory.

## Usage

### Managing Leads

1. **Viewing Leads**: The main dashboard shows all active leads with their scores, status, and notes
2. **Adding Leads**: Click "Add Lead" to create a new lead with name, email, company, and initial score
3. **Editing Leads**: Click "Edit" on any lead to modify their information and status
4. **Deleting Leads**: Click "Delete" to remove a lead (requires confirmation)

### Converting to Opportunities

1. Contact the lead and update their status to "Contacted" or "Qualified"
2. Click "Convert to Opportunity" to move the lead to the opportunities pipeline
3. Converted leads appear in the "Opportunities" tab with conversion timestamps

### Lead Scoring

- **Green (80-100)**: High-value prospects
- **Yellow (60-79)**: Medium-value prospects  
- **Red (0-59)**: Lower-value prospects

### Data Persistence

The application automatically saves all data to your browser's localStorage, so your leads and opportunities persist between sessions.

## Project Structure

```
src/
├── components/
│   ├── LeadList.js      # Lead listing and management
│   ├── LeadForm.js      # Add/edit lead form
│   └── OpportunityList.js # Converted opportunities view
├── App.js               # Main application component
├── App.css             # Styling and responsive design
└── index.js            # React application entry point
```

## Technologies Used

- **React 18**: Modern React with hooks and functional components
- **CSS3**: Custom styling with gradients and responsive design
- **Local Storage**: Browser-based data persistence
- **Create React App**: Development and build tooling

## License

This project is released into the public domain under the [Unlicense](LICENSE).
