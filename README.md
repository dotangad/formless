# `formless`: A serverless form backend which uses Google Sheets as a database.

## Usage example

```html
<form
  action="https://dotangad-formless.now.sh/api/"
  method="post"
  enctype="application/x-www-form-urlencoded"
>
  <input type="hidden" name="sheetId" value="<YOUR_GOOGLE_SHEET_ID>" />
  <!-- Sheet number defaults to 0, the first sheet in the file. -->
  <input type="hidden" name="sheetNo" value="<SHEET_NUMBER>" />
  <!-- The name attributes of the inputs must correspond with the header cells of the columns -->
  <input type="text" name="col1" />
  <input type="text" name="col2" />
  <input type="text" name="col3" />
  <input type="text" name="col4" />
  <button type="submit">Submit</button>
</form>
```

## Problems?

File an issue or [contact](https://angad.dev/#contact) me.
