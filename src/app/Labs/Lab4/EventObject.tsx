import { useState } from "react";

export default function EventObject() {
  const [event, setEvent] = useState<Record<string, unknown> | null>(null);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Create a copy of all event properties
    const eventCopy: Record<string, unknown> = {};
    
    for (const key in e) {
      if (key === 'target' || key === 'currentTarget') {
        eventCopy[key] = (e[key as keyof typeof e] as HTMLElement).outerHTML;
      } else if (key === 'view') {
        // Skip view as it's not serializable
        continue;
      } else {
        eventCopy[key] = e[key as keyof typeof e];
      }
    }
    
    setEvent(eventCopy);
  };
  
  return (
    <div>
      <h2>Event Object</h2>
      <button 
        onClick={(e) => handleClick(e)}
        className="btn btn-primary"
        id="wd-display-event-obj-click"
      >
        Display Event Object
      </button>
      <pre>{JSON.stringify(event, null, 2)}</pre>
      <hr/>
    </div>
  );
}