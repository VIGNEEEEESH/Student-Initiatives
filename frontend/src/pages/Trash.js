<form onSubmit={onsubmit}>
          <br/>
            <label>Name of the COE: &nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type="text" onChange={handleCOENameChange} required/><br/><br/>

            <label>Mission of the COE: &nbsp;</label>
            <textarea  onChange={handleCOEMissionChange} required/><br/><br/>

            <label>Vision of the COE: &nbsp;&nbsp;</label>
            <textarea onChange={handleCOEVisionChange} required/><br/><br/>

            <label>Name of the : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type="text" onChange={handleCOEMentorChange} placeholder='Mentor' required/><br/><br/>

            <label>Name of the : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type="text" onChange={handleCOECoFounderChange} placeholder='Co-Founder' required/><br/><br/>

            <label>Email-ID of the : &nbsp;&nbsp;&nbsp;</label>
            <input type="text" onChange={handleCOECoFounderEmailChange} placeholder='Co-Founder' required/><br/><br/>
            <label>Create a password : &nbsp;</label>
            <input type="password" onChange={handleCOEPasswordChange} required/><br/><br/>

            
          <label style={{display:"inline"}}> Upload COE's Logo:</label> <input style={{display:"inline"}}type="file" onChange={uploadFile} required accept="image/png, image/jpeg,.jpg"/>
          <input type="submit" />
            
        </form>