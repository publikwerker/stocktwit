import React from 'react';

export default function Body() {
  return (
    <main>
      <div className="symbol-input">
        <form>
          <label>
            Symbol:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </main>
  )
}