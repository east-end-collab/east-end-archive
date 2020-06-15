# Steps to Update the Records Data

1. Export all records from JSTOR Forum as Excel (`.xls`) file
2. Open the `.xls` file in [Google Sheets](https://www.google.com/sheets/about/) and download as a Comma Separated Values (`.csv`) file
3. Rename the resulting `.csv` file to `allrecords.csv`
4. Go to the GitHub repository on [Github.com](https://github.com/)
5. Click the `Upload files` (toward the top-right of the window)
6. Drag and drop or select the `allrecords.csv` from your file explorer to upload it
7. Add an optional commit message under where it says **Commit changes**
8. Click the **Commit changes** button
9. Wait for the build to finish. Should not take longer than 10-15 minutes. You can check on the status of the build on [Netlify](https://app.netlify.com/)

## Notes about modifying columns in JSTOR or the exported csv file

- No column should ever have the same name / heading as another field (Note, the numbers in brakets (visible in JSTOR) are removed as well as all non-alpha-numeric characters except underscores)
- Adding a new column is possible but it will be added automatically to the person pages.
- Reorganizing columns is also possible. This reorganization will be reflected in the person pages.
- The following fields are explicitly refferred to within the app, changing their field name or removing these columns will have unwanted results.
    - Suppressed Fields
        - SupDeath_Primary
        - Death_Secondary
        - Race_as_it_appears_on_document
        - Name_of_Master_or_Mistress
        - Plantation
        - GIS_ID
        - Stone_Broken
        - Notes
        - Marker_Transcription
        - CollectedBy
        - Collected_By
        - Collection_Date
        - Is_this_the_only_marker_for_this_person
        - SSID
        - Data_Source
        - Number_of_photos_taken_and_file_names_if_known
    - Other fields explicitly referred to in the app
        - Birth_Year
        - Death_Year
        - Media_URL
        - FindGraveURL
        - Map_URL
        - EastEndCemeteryRVA_URL
        - Full_Biography_Record
        - Prefix
        - First_Name
        - Last_Name
        - Middle_Name
        - Suffix
        - Birth_Location
        - Death_Location
        - FindGrave_ID
        - Address
        - Cemetery Name
        - Church_affiliation
        - Funeral_Home
        - Occupation
        - Employer
        - Fraternal_and_Beneficial_Organizations
        - Notes_and_Clarifications
        - Military_Service
        - Type

---
---

# Developer Documentation

## Steps to set-up local dev environment
You will need to install [Jekyll](https://jekyllrb.com/docs/installation/) and [Node](https://nodejs.org/en/)
1. `git clone` the repo
2. `cd` into repo
3. Run `bundle install`
4. Run  `npm install`
5. Optionally, edit `./_config.yml` so the html person pages are generated using the test data set instead of the full data set. The full data set can take about 2 minutes to build each page while the test-data (10 records) takes ~ a few seconds.

    Change this:
    ```
    page_gen:
    # - data: 'test_records'
    - data: 'full_records'
        template: 'person'
        name: 'SSID'
        dir: 'people'
    ```
    to:
    ```
    page_gen:
    - data: 'test_records'
    # - data: 'full_records'
        template: 'person'
        name: 'SSID'
        dir: 'people'
    ```
5. To start jekyl server (w/ livereloading) run `bundle exec jekyll serve --livereload`
6. If working on the React components, you'll want to run
    ```
    npx babel --watch src --out-dir assets/react/build --presets react-app/prod
    ```
    to compile the jsx

## Generating json files from csv
- `./generateRecords.js` is run just before build on Netlify (per the `./netlify.toml` file)
- You can run it manually in dev by running `node generateRecords.js`
- This generates `._data/all_records.json`, `._data/full_records.json`, and `._data/test_records.json`.

   - `full_records.json` represents records that are considered to be the full biographical record and is used to generate the search index.
   - `full_records.json` is also used to generate each person page (unless `./_config.yml` is changed to point to `test-records.json`)
   - `all_records.json` is used within each person page to show all other records associated with that person.

## If Netlify build Fails to build all 3k+ people pages
1. [Install netlify CLI](https://docs.netlify.com/cli/get-started/#installation)
2. `jekyll build` locally
3. `netlify deploy`, which will push all contents of the `_site` folder to the server, on a draft deploy
4. If that looks good, use `netlify deploy --prod`, which should deploy to the live site.
