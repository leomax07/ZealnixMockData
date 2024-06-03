interface Props {
  notes: string[];
  date: string;
}

function NotesComponent({ notes, date }: Props) {
  return (
    <div className="notes__container">
      <div className="notes__header">
        <p className="header">Notes</p>
        <span className="date">{date}</span>
      </div>
      {notes.map((note) => (
        <p className="note">{note}</p>
      ))}
    </div>
  );
}

export default NotesComponent;
