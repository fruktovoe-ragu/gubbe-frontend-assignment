# Gubbe Frontend Assignment

## Goal

The goal of this assignment is to modify existing piece of code to make a pleasant looking and usable table view. It is not meant to be a comprehensive test of your ability, but rather a way to quickly evaluate your ability to implement something that looks nice and works well. Please remember that it does not have to be perfect or complete, but just a showcase. Please ensure that you prioritize the most important things.

Completing this task should take at most an hour. If it is taking longer than an hour, please stop, submit what you have, and explain the situation and what you would have done in the submission comment.

### First Priority

- Make the table look nice and Gubbe-y
- Make all the data nicely formatted
- Evaluate accessibility - quick notes for this are fine
- Consider code structure

### Second Priority

- Make the table filterable
- Make the table sortable
- Make the table pagable

## Explanation

- Make the table look nice and Gubbe-y

I chose a brand light coral color for the main background as it aligns with the current brand color usage, and brand green for the table header as it is the main anchor of the page. I selected two of the most neutral colors: white and light gray, for the table content background. They don't distract from scanning and reading the table content. I alternate these colors for a clear distinction between rows, which improves readability. I used white for the interactive elements (pagination, select, reset button) as they are not the primary elements on the page and should not draw attention away from the table content. I also added rounded corners to the table, as it aligns with the website style.

- Make all the data nicely formatted

I formatted the date using the dd.mm.yyyy format, as it is the most common one. I added an additional column with order numbers for the rows to improve navigation.
Additionally, I would format salary numbers into euro currency.

- Evaluate accessibility - quick notes for this are fine

I used #333 for the table content and applied a medium font weight for the brand green color of interactive elements to meet AA accessibility standards of contrast. I ensured that all interactive elements respond to the Tab key press and have an aria-label to convey their meaning.

- Consider code structure

I'd improve the structure by moving the filtering and pagination sections and functions, states related to them into separate components for better maintainability and readability of the code.

- Make the table filterable

I implemented filtration by Department.
To improve the feature, I could allow multi-select for more than one department. Additionally, I could add other filters, such as City and Company.

- Make the table pagable

I implemented Pagination using material-ui component.

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```
