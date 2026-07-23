Test Case ID	Test Case Title	Preconditions	Priority	Type	Test Steps	Test Data	Expected Result	Actual Result	Status	Evidence
CLIENT_001	Verify adding a new client with all required fields	User is logged in and on the Clients screen	Critical	Functional	"1. Tap ""Add Client"".
2. Enter Full Name, Phone Number, Gender, Outfit Type.
3. Tap ""Save""."	"Name: Adaeze Okafor
Phone: +2348012345678
Gender: Female
Outfit Type: Custom"	Client is created and appears in the Clients list with the entered details.			
CLIENT_002	Verify client creation blocks a missing required field	User is on the Add Client screen	High	Edge Case	"1. Tap ""Add Client"".
2. Leave Full Name blank.
3. Fill other fields.
4. Tap ""Save""."	Phone: +2348012345678	Save is blocked and an inline error indicates Full Name is required.	As expected	Pass	
CLIENT_003	Verify phone number field rejects invalid formats	User is on the Add Client screen	Medium	Edge Case	"1. Enter a client name.
2. Enter an invalid phone number.
3. Tap ""Save""."	Phone: 12AB	A validation error is shown for the phone field; the client is not saved.	Moved to the next step	Fail	
CLIENT_003	Verify clients are saved with each steps	User is on the Add Client screen	High	Functional	"1. Tap ""Add Client"".
2. Enter Full Name, Phone Number, Gender, Outfit Type.
3. Tap ""Save""."	"Name: Adaeze Okafor
Phone: +2348012345678
Gender: Female
Outfit Type: Custom"	The progress is saved and if user goes back, they can see the data prefilled			https://jam.dev/c/041b7abf-3920-4206-be96-f2c9d7d84f93
	Verify saved in drafts are saved and stored	User is on the Add Client screen	Medium	Functional	"1. Tap ""Add Client"".
2. Enter Full Name, Phone Number, Gender, Outfit Type.
3. Tap ""Save to draft""."	"Name: Adaeze Okafor
Phone: +2348012345678
Gender: Female
Outfit Type: Custom"	Details are saved some in the drafts and visible. No item is missing			
CLIENT_004	Verify editing an existing client's details	At least one client exists	High	Functional	"1. Open a client profile.
2. Tap ""Edit"".
3. Update the phone number.
4. Tap ""Save""."	New Phone: +2348099998888	The client profile reflects the updated phone number immediately and after an app refresh.			
CLIENT_005	Verify deleting a client requires confirmation	At least one client exists	High	Functional	"1. Open a client profile.
2. Tap ""Delete"".
3. Observe the confirmation prompt.
4. Confirm deletion."	N/A	A confirmation dialog appears before deletion; once confirmed, the client and associated measurements/orders are removed from the Clients list.			
CLIENT_006	Verify searching for a client by name	Multiple clients exist, including "Adaeze Okafor"	High	Functional	"1. Go to the Clients screen.
2. Enter a partial name in Search."	Search term: Adae	The client list filters to show only clients whose name matches "Adae*", including "Adaeze Okafor".			
CLIENT_007	Verify searching for a client by phone number	Multiple clients exist	Medium	Functional	"1. Go to the Clients screen.
2. Enter a phone number/partial number in Search."	Search term: 8012345678	The matching client(s) are returned.			
CLIENT_008	Verify search returns an empty state for no matches	Clients exist, none matching the search term	Medium	UI	1. Enter a search term that matches no client.	Search term: Zzxxqq123	An empty state message (e.g. "No clients found") is displayed instead of a blank or broken list.			
CLIENT_009	Verify client name accepts special characters/apostrophes without breaking the UI	User is on the Add Client screen	Low	Edge Case	"1. Enter a name containing an apostrophe and hyphen.
2. Save."	Name: O'Brien-Chukwu	The client is saved and displayed correctly with the special characters intact throughout the app (list, profile, PDF export).			
CLIENT_010	Verify the Outfit Type dropdown lists all supported types including "Custom"	User is on the Add/Edit Client screen	Medium	UI	1. Tap the Outfit Type dropdown.	N/A	The dropdown displays all 8 outfit types per spec, with "Custom" available as the final option.			
CLIENT_011	Verify a client can have multiple orders linked to their profile	A client exists with one order already	Medium	Functional	"1. Open the client's profile.
2. Create a second order for the same client.
3. Return to the client profile."	N/A	Both orders are listed under the same client profile with correct order history.			
CLIENT_012	Verify Clients list performance with a large dataset	Workspace contains a representative large volume of client records (per NFR, up to 10,000)	Medium	Functional	"1. Navigate to the Clients screen.
2. Measure the time to load and scroll through the list, and to run a search."	Seeded dataset: 10,000 client records	The Clients list loads and search remains responsive (search results in under 1 second, per NFR) without crashing or significant lag.			
CLIENT_013	Verify a warning appears when adding a client that closely matches an existing one	A client "Adaeze Okafor" with phone +2348012345678 already exists	Medium	Edge Case	"1. Tap ""Add Client"".
2. Enter the same name and phone number as an existing client.
3. Attempt to save."	"Name: Adaeze Okafor
Phone: +2348012345678"	The user is warned that a matching client may already exist and asked to confirm before a duplicate record is created — protects against accidental double entry.			
CLIENT_014	Verify double-tapping "Save" does not create two identical client records	User is on the Add Client screen with valid data entered	High	Edge Case	"1. Fill in valid client details.
2. Rapidly double-tap ""Save""."	"Name: Chinedu Obi
Phone: +2348055512345"	Only one client record is created; the Save button disables or shows a loading state after the first tap.			
CLIENT_015	Verify canceling the Add Client form mid-entry prompts before discarding data	User has entered some details on the Add Client screen	Medium	UI	"1. Enter a name and phone number.
2. Tap the back/close button without saving."	N/A	The user is asked to confirm ("Discard changes?") before the entered details are lost, rather than silently discarding them.			
CLIENT_016	Verify an extremely long client name is handled gracefully	User is on the Add Client screen	Low	Edge Case	"1. Enter a name of 100+ characters.
2. Save."	Name: "Adaeze Chidinma Ngozi Okafor-Adebayo Folasade Ihuoma Chukwuemeka ..." (100+ chars)	The name is either capped at a sensible limit with a clear message, or saved and displayed with proper text wrapping/truncation — the app does not crash or corrupt the layout.			
CLIENT_017	Verify leading/trailing spaces in the client name are trimmed	User is on the Add Client screen	Low	Edge Case	"1. Enter a name with extra spaces before/after it (common when typed on a phone keyboard).
2. Save."	Name: "  Adaeze Okafor  "	The name is trimmed and saved/displayed as "Adaeze Okafor" without the extra spaces.			
CLIENT_018	Verify a Full Name field containing only spaces is rejected as blank	User is on the Add Client screen	Medium	Edge Case	"1. Enter only spacebar characters into the Full Name field.
2. Attempt to save."	Name: "    "	The field is treated as empty and the same "Full Name is required" validation error is shown, rather than accepting a blank-looking record.			