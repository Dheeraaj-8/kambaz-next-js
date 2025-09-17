export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name"><h3>Assignment Name</h3></label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML"/><br /><br />
      <textarea
        id="wd-description"
        defaultValue="The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kambaz application Links to all relevant source code repositories The Kambaz application should include a link to navigate back to the landing page."
      />
      <br />
    
      <table>
        <tbody>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" type="number" defaultValue={100} />
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{height: "15px"}}></td>
        </tr>
        
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group" defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="ABC">ABC</option>
              <option value="CWS">CWS</option>
              <option value="BSA">BSA</option>
            </select>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{height: "15px"}}></td>
        </tr>
        
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as" defaultValue="Percentage">
              <option value="Percentage">Percentage</option>
              <option value="ABC">ABC</option>
              <option value="CWS">CWS</option>
              <option value="BSA">BSA</option>
            </select>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{height: "15px"}}></td>
        </tr>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type" defaultValue="Online">
              <option value="Online">Online</option>
              <option value="ABC">ABC</option>
              <option value="CWS">CWS</option>
              <option value="BSA">BSA</option>
            </select>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{height: "15px"}}></td>
        </tr>

        <tr>
          <td align="left" valign="top">
            <label >Online Entry Options:</label>
          </td>
          <td>
            <br />
            <input type="checkbox" id="wd-text-entry"/>
            <label htmlFor="wd-text-entry">Text Entry</label><br/>

            <input type="checkbox" id="wd-website-url"/>
            <label htmlFor="wd-website-url">Website URL</label><br/>

            <input type="checkbox" id="wd-media-recordings"/>
            <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

            <input type="checkbox" id="wd-student-annotation"/>
            <label htmlFor="wd-student-annotation">Student Annotation</label><br />

            <input type="checkbox" id="wd-file-upload"/>
            <label htmlFor="wd-file-upload">File Uploads</label>
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{height: "15px"}}></td>
        </tr>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign to</label>
          </td>
          <td>
            <input id="wd-assign-to" defaultValue="Everyone" />
          </td>
        </tr>
        <tr>
          <td colSpan={2} style={{height: "15px"}}></td>
        </tr>
       
        <tr>
          <td colSpan={2} style={{height: "15px"}}></td>
        </tr>
        <tr>
          <td align="right">
            <label htmlFor="wd-due-date">Due</label>
          </td>
          <td>
            <input type="date" id="wd-due-date"/>
          </td>
        </tr>
           <tr>
          <td colSpan={2} style={{height: "15px"}}></td>
        </tr>

        <tr>
          <td align="right">
            <label htmlFor="wd-available-from">Available from</label>
          </td>
          <td>
            <input type="date" id="wd-available-from"/>
          </td>
          <td align="right">
            <label htmlFor="wd-available-until">Until</label>
          </td>
          <td>
            <input type="date" id="wd-available-until"/>
          </td>
        </tr>

        </tbody>
      </table>
      <hr />
      <div>
        <button id="wd-cancel-btn">Cancel</button> <button id="wd-save-btn">Save</button>
      </div>
    </div>
  );
}