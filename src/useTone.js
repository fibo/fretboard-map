import * as Tone from "tone";

const synth = new Tone.PolySynth(Tone.Synth).toDestination();

export const useTone = () => {
  return { synth };
};
