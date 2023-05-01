import * as Tone from "tone";
import { useTone } from "../../useTone";
import noteColors from "../../instrument-scale-calculations/notes-colors";

function DisplayInstrument({ instrument, rootNote, isMobile }) {
  console.log(
    ";;m;, instrumentRepresentation",
    instrument.instrumentRepresentation
  );
  if (isMobile === false) {
    return (
      <div className="inner-instrument-container">
        <div className="fretboard">
          <FretNumbers fretNumbers={instrument.numberOfNotes} />
          <FretBoard
            fretboard={instrument.instrumentRepresentation}
            rootNote={rootNote}
          />
        </div>
      </div>
    );
  }
}

function FretNumbers({ fretNumbers }) {
  // const fretNubersStyle = {
  //     minWidth: "52px",
  //     display: "inline-block",
  //     textAlign: "center"}
  const numbers = Array.from(Array(fretNumbers + 1).keys()).map(
    (number, index) => (
      <div key={"fretnum" + index} className={"fretNumContainer"}>
        {number}
      </div>
    )
  );
  return <div className="fretNumbers">{numbers}</div>;
}

function Note({ note, noteIndex, stringIndex, rootNote, isVertical }) {
  const { synth } = useTone();
  const noteStyle = {
    backgroundColor: noteColors[note.noteName],
  };

  const noteClassNames = { note: "note", rootNote: "root-note" };
  let noteClass = "";

  if (rootNote === note.noteName) {
    noteClass = noteClassNames.rootNote;
  } else {
    noteClass = noteClassNames.note;
  }

  return (
    <div
      id={"string" + stringIndex + "note" + noteIndex}
      className="noteContainer"
    >
      <div
        className={noteClass}
        visibility={note.visibility}
        style={noteStyle}
        onClick={() => {
          const now = Tone.now();

          synth.triggerAttack(`${note.noteName}${note.octave}`, now);
          synth.triggerRelease([`${note.noteName}${note.octave}`], now + 4);
          // synth.triggerAttack("D4", now);
          // synth.triggerAttack("F4", now + 0.5);
          // synth.triggerAttack("A4", now + 1);
          // synth.triggerAttack("C5", now + 1.5);
          // synth.triggerAttack("E5", now + 2);
          // synth.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 4);
        }}
      >
        {note.noteName + note.octave}
      </div>
    </div>
  );
}

function InstrumentString({
  notesArray,
  stringIndex,
  openStringKey,
  rootNote,
}) {
  const stringNotesArray = notesArray.map((element, index) => (
    <Note
      note={element}
      noteIndex={index}
      stringIndex={stringIndex}
      rootNote={rootNote}
      key={"note" + index}
    />
  ));
  return (
    <div className="string-container">
      <div className="open-string">{openStringKey}</div>
      <div className="string" id={"string" + stringIndex}>
        {stringNotesArray}
      </div>
    </div>
  );
}

function FretBoard({ fretboard, rootNote }) {
  const resultBoard = fretboard.map((string, index) => (
    <InstrumentString
      notesArray={string}
      stringIndex={index}
      openStringKey={string[0].noteName}
      key={"string" + index}
      rootNote={rootNote}
    />
  ));
  return <div className="neck">{resultBoard}</div>;
}

// function Fret({notesArray, fretIndex, openStringKey, rootNote}) {
//     const fretNotes = notesArray.map((element, index) =>
//     <Note
//         note={element}
//         noteIndex={index}
//         stringIndex={fretIndex}
//         rootNote={rootNote}
//         key={"vert_note" + index}
//         style={{border: "solid"}}
//         isVertical={true}
//         />)
//     return <div id={"fret" + fretIndex} className="fret">{fretNotes}</div>
// }

// function VerticalFretBoard({fretboard, rootNote}) {
//     const numberOfNotes = fretboard[0].length;
//     const numberOfStrings = fretboard.length;
//     let verticalBoard = [];
//     for (let noteNumber=0; noteNumber < numberOfNotes; noteNumber++) {
//         let fret = []
//             for (let stringNumber=numberOfStrings - 1; stringNumber >= 0; stringNumber--) {
//                 fret.push(fretboard[stringNumber][noteNumber]);
//             }
//         verticalBoard.push(fret);
//     }
//     const resultVerticalBoard = verticalBoard.map((fret, index) =>
//     <Fret
//     notesArray={fret}
//     fretIndex={index}
//     rootNote={rootNote}
//     key={index}/>);
//     return <div className='vertical-neck'>{resultVerticalBoard}</div>;

// }

export default DisplayInstrument;
