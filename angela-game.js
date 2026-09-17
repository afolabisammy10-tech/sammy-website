const state = {
  trust: 65,
  alertness: 55,
  tension: 30,
  currentScene: 'intro',
  voiceEnabled: true
};

const scenes = {
  intro: {
    tag: 'Scene 1',
    line: 'Angela leans closer to the phone. "Someone is outside the apartment building. I can hear footsteps on the stairs, but the lobby camera is dead."',
    choices: [
      {
        text: 'Check the hallway camera feed',
        next: 'camera',
        trust: 5,
        alertness: 10,
        tension: 8,
        note: 'You trust Angela’s instincts and move decisively.'
      },
      {
        text: 'Lock the door and stay quiet',
        next: 'door',
        trust: 2,
        alertness: 15,
        tension: 12,
        note: 'You keep things calm, but the room feels heavier.'
      },
      {
        text: 'Call the building caretaker',
        next: 'call',
        trust: -3,
        alertness: 5,
        tension: 6,
        note: 'You try to get backup, but the response is slow.'
      }
    ]
  },
  camera: {
    tag: 'Scene 2',
    line: 'The live feed flickers. A figure in a dark coat stands beneath the stairwell, just outside the camera angle. Angela lowers her voice. "He is waiting for the elevator. We have less than a minute."',
    choices: [
      {
        text: 'Move to the window and watch the exit',
        next: 'window',
        trust: 8,
        alertness: 12,
        tension: 5,
        note: 'You stay analytical and keep your eyes on the danger.'
      },
      {
        text: 'Grab the emergency whistle and signal the neighbor',
        next: 'signal',
        trust: 4,
        alertness: 16,
        tension: 10,
        note: 'The noise may draw attention, but it could save everyone.'
      },
      {
        text: 'Open the door and confront him',
        next: 'confront',
        trust: -6,
        alertness: 20,
        tension: 18,
        note: 'You act on instinct, but it is reckless.'
      }
    ]
  },
  door: {
    tag: 'Scene 3',
    line: 'A heavy thud rattles the frame. Angela steps away from the window and whispers, "Do not answer unless it is a voice you know. I am checking the lock."',
    choices: [
      {
        text: 'Ask Angela to check the peephole',
        next: 'peep',
        trust: 9,
        alertness: 8,
        tension: 4,
        note: 'You trust Angela to read the situation without panic.'
      },
      {
        text: 'Keep the chain on and wait',
        next: 'wait',
        trust: 3,
        alertness: 12,
        tension: 14,
        note: 'You stay composed, but the silence becomes unbearable.'
      },
      {
        text: 'Run to the fire exit',
        next: 'exit',
        trust: -5,
        alertness: 18,
        tension: 21,
        note: 'You bolt for the stairs without thinking.'
      }
    ]
  },
  call: {
    tag: 'Scene 4',
    line: 'The caretaker picks up with a sleepy voice. "I am almost there," he says, but the call drops. Angela looks at you and says, "I do not think he is coming. The hallway is quiet, but that is the problem."',
    choices: [
      {
        text: 'Use the emergency alarm',
        next: 'alarm',
        trust: 7,
        alertness: 16,
        tension: 9,
        note: 'The sound is loud and urgent, but it forces the scene into the open.'
      },
      {
        text: 'Move to the stairwell and wait',
        next: 'stairwell',
        trust: 2,
        alertness: 12,
        tension: 13,
        note: 'You choose patience, but with a sharpened sense of danger.'
      },
      {
        text: 'Keep the lights off and listen',
        next: 'listen',
        trust: 5,
        alertness: 18,
        tension: 10,
        note: 'A slow breath, a careful ear, and no sudden motion.'
      }
    ]
  },
  window: {
    tag: 'Scene 5',
    line: 'From the window, you see the figure hesitate, then look up. Angela murmurs, "There are two of them. One is in the alley. One is on the fifth floor landing."',
    choices: [
      {
        text: 'Call the police and give exact directions',
        next: 'endingSafe',
        trust: 12,
        alertness: 11,
        tension: -5,
        note: 'Your calm reporting helps the authorities respond on time.'
      },
      {
        text: 'Keep moving through the flat and prepare to hide',
        next: 'endingHidden',
        trust: 6,
        alertness: 18,
        tension: 10,
        note: 'You hide with purpose and survive the night by staying patient.'
      },
      {
        text: 'Leave the building through the back stairs',
        next: 'endingRun',
        trust: -8,
        alertness: 20,
        tension: 20,
        note: 'You run, but the risk of being seen is far greater.'
      }
    ]
  },
  signal: {
    tag: 'Scene 6',
    line: 'The whistle cuts through the quiet stairwell. Angela grips your arm and says, "Good. Now they know we are awake. Keep moving toward the front desk, and do not stop until you hear a siren."',
    choices: [
      {
        text: 'Follow Angela to the lobby',
        next: 'endingSafe',
        trust: 11,
        alertness: 14,
        tension: -2,
        note: 'Your courage and Angela’s guidance save the situation.'
      },
      {
        text: 'Stay on the landing and watch',
        next: 'endingHidden',
        trust: 4,
        alertness: 13,
        tension: 12,
        note: 'You remain in the dark but keep control of the room.'
      },
      {
        text: 'Rush the building entrance',
        next: 'endingRun',
        trust: -9,
        alertness: 24,
        tension: 25,
        note: 'The panic escalates before help arrives.'
      }
    ]
  },
  confront: {
    tag: 'Scene 7',
    line: 'The door swings open before you can think. Angela catches a glimpse of movement and says, "No, do not —" But the hallway is already turning violent. The sound echoes, and the tension surges like a storm.'',
    choices: [
      {
        text: 'Try to calm the situation with a firm voice',
        next: 'endingSafe',
        trust: 2,
        alertness: 8,
        tension: 5,
        note: 'Your voice steadies the moment enough to stop panic.'
      },
      {
        text: 'Hide behind the sofa and wait it out',
        next: 'endingHidden',
        trust: 4,
        alertness: 10,
        tension: 16,
        note: 'You survive by staying still and giving the attackers no target.'
      },
      {
        text: 'Chase them down the hallway',
        next: 'endingRun',
        trust: -12,
        alertness: 28,
        tension: 30,
        note: 'The choice is impulsive and ends badly.'
      }
    ]
  },
  peep: {
    tag: 'Scene 8',
    line: 'Angela checks the peephole, then backs away. "It is not him. Someone is trying to make us panic. Keep the lock on and stay inside."',
    choices: [
      {
        text: 'Follow Angela to the emergency room door',
        next: 'endingSafe',
        trust: 14,
        alertness: 14,
        tension: -5,
        note: 'Your trust pays off and the danger diffuses.'
      },
      {
        text: 'Wait and listen for footsteps',
        next: 'endingHidden',
        trust: 7,
        alertness: 15,
        tension: 8,
        note: 'You remain disciplined and let the building settle.'
      },
      {
        text: 'Force the door open anyway',
        next: 'endingRun',
        trust: -10,
        alertness: 19,
        tension: 22,
        note: 'The risk is too high and the move breaks your advantage.'
      }
    ]
  },
  wait: {
    tag: 'Scene 9',
    line: 'The silence stretches, and then a shout fades into the corridor. Angela exhales. "That was not the target. They are moving away."',
    choices: [
      {
        text: 'Open the door once the hallway is clear',
        next: 'endingSafe',
        trust: 12,
        alertness: 12,
        tension: -4,
        note: 'The decision is cautious and effective.'
      },
      {
        text: 'Stay inside until morning',
        next: 'endingHidden',
        trust: 6,
        alertness: 9,
        tension: 7,
        note: 'You keep the environment secure and avoid unnecessary risk.'
      },
      {
        text: 'Leave through the back window',
        next: 'endingRun',
        trust: -11,
        alertness: 22,
        tension: 26,
        note: 'The escape route is riskier than it looks.'
      }
    ]
  },
  exit: {
    tag: 'Scene 10',
    line: 'The stairwell door slams behind you and the building goes cold. Angela turns quickly. "You made the wrong choice. We are exposed now."',
    choices: [
      {
        text: 'Take the stairs to the garden and call for help',
        next: 'endingSafe',
        trust: 4,
        alertness: 18,
        tension: 15,
        note: 'Even in panic you keep a clear plan and survive.'
      },
      {
        text: 'Hide in the maintenance room',
        next: 'endingHidden',
        trust: 3,
        alertness: 20,
        tension: 18,
        note: 'You reduce the risk by staying unseen.'
      },
      {
        text: 'Run toward the street to escape',
        next: 'endingRun',
        trust: -14,
        alertness: 26,
        tension: 32,
        note: 'The movement is chaotic and the danger closes in.'
      }
    ]
  },
  alarm: {
    tag: 'Scene 11',
    line: 'The alarm erupts like a siren through the whole building. Angela steadies herself and says, "Now we have their attention. Keep your head down and let the authorities reach you."',
    choices: [
      {
        text: 'Stay at the door and wait for help',
        next: 'endingSafe',
        trust: 10,
        alertness: 9,
        tension: -5,
        note: 'The scene is controlled, and everyone can breathe.'
      },
      {
        text: 'Move to the inner hall and hide',
        next: 'endingHidden',
        trust: 5,
        alertness: 15,
        tension: 8,
        note: 'You keep moving without giving away your position.'
      },
      {
        text: 'Run outside before the police arrive',
        next: 'endingRun',
        trust: -16,
        alertness: 24,
        tension: 28,
        note: 'The rush turns into a panic sprint.'
      }
    ]
  },
  stairwell: {
    tag: 'Scene 12',
    line: 'The stairwell is empty, but there is a wet trail on the steps. Angela glances down and then back up. "Someone is moving a little too carefully. We are not alone."',
    choices: [
      {
        text: 'Take the corridor and trigger the emergency alert',
        next: 'endingSafe',
        trust: 11,
        alertness: 15,
        tension: 3,
        note: 'You act with urgency and intelligence.'
      },
      {
        text: 'Stay in the stairwell and wait',
        next: 'endingHidden',
        trust: 6,
        alertness: 13,
        tension: 11,
        note: 'You hold your ground long enough for the threat to pass.'
      },
      {
        text: 'Rush to the ground floor',
        next: 'endingRun',
        trust: -13,
        alertness: 22,
        tension: 27,
        note: 'You lose the discipline of the moment.'
      }
    ]
  },
  listen: {
    tag: 'Scene 13',
    line: 'You listen. A faint scrape of metal. Then a voice in the hallway. Angela asks softly, "Do you think it is the police or the wrong person?"',
    choices: [
      {
        text: 'Check the door and call the building security line',
        next: 'endingSafe',
        trust: 12,
        alertness: 18,
        tension: 2,
        note: 'You identify the threat and act before it becomes a crisis.'
      },
      {
        text: 'Stay low and wait for the noise to pass',
        next: 'endingHidden',
        trust: 7,
        alertness: 16,
        tension: 8,
        note: 'Your patience saves the situation.'
      },
      {
        text: 'Open the door and confront whoever is there',
        next: 'endingRun',
        trust: -15,
        alertness: 25,
        tension: 29,
        note: 'You act too soon and lose control.'
      }
    ]
  },
  endingSafe: {
    tag: 'Ending: Safe',
    line: 'Angela remains calm until the sirens arrive. The danger gives way, and in the silence after, she says, "You kept your head. That is what saves people." The night ends with the lights back on and the apartment finally breathing again.',
    choices: []
  },
  endingHidden: {
    tag: 'Ending: Hidden',
    line: 'The building settles, but the fear does not vanish. Angela stands in the dark and says, "We stayed alive. That is the win tonight." The room is quiet, the danger is gone, and the night still feels too close.',
    choices: []
  },
  endingRun: {
    tag: 'Ending: Lost',
    line: 'The hallway becomes chaos. Angela reaches for you, but the pace is already too fast. "Run, then!" she shouts, and the world falls apart into sound, panic, and a night you can never quite explain.',
    choices: []
  }
};

const storyText = document.getElementById('storyText');
const sceneTag = document.getElementById('sceneTag');
const choiceContainer = document.getElementById('choiceContainer');
const voiceToggle = document.getElementById('voiceToggle');

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

function updateMeters() {
  document.getElementById('trustMeter').style.width = `${clamp(state.trust, 0, 100)}%`;
  document.getElementById('alertMeter').style.width = `${clamp(state.alertness, 0, 100)}%`;
  document.getElementById('tensionMeter').style.width = `${clamp(state.tension, 0, 100)}%`;
}

function speak(text) {
  if (!state.voiceEnabled || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.96;
  utterance.pitch = 1.1;
  utterance.volume = 1;
  window.speechSynthesis.speak(utterance);
}

function renderScene() {
  const scene = scenes[state.currentScene];
  if (!scene) return;

  sceneTag.textContent = scene.tag;
  storyText.innerHTML = `<strong>Angela:</strong> ${scene.line}`;

  if (state.currentScene === 'endingSafe' || state.currentScene === 'endingHidden' || state.currentScene === 'endingRun') {
    choiceContainer.innerHTML = `
      <button class="choice" id="restartGame" type="button">
        Play again
        <small>Restart the night from the beginning.</small>
      </button>
    `;

    document.getElementById('restartGame').addEventListener('click', () => {
      state.trust = 65;
      state.alertness = 55;
      state.tension = 30;
      state.currentScene = 'intro';
      updateMeters();
      renderScene();
    });

    speak(scene.line);
    updateMeters();
    return;
  }

  choiceContainer.innerHTML = scene.choices.map((choice) => `
    <button class="choice" data-next="${choice.next}" data-trust="${choice.trust}" data-alertness="${choice.alertness}" data-tension="${choice.tension}" type="button">
      ${choice.text}
      <small>${choice.note}</small>
    </button>
  `).join('');

  choiceContainer.querySelectorAll('.choice').forEach((button) => {
    button.addEventListener('click', () => {
      state.trust = clamp(state.trust + Number(button.dataset.trust), 0, 100);
      state.alertness = clamp(state.alertness + Number(button.dataset.alertness), 0, 100);
      state.tension = clamp(state.tension + Number(button.dataset.tension), 0, 100);
      state.currentScene = button.dataset.next;
      updateMeters();
      renderScene();
    });
  });

  speak(scene.line);
  updateMeters();
}

voiceToggle.addEventListener('click', () => {
  state.voiceEnabled = !state.voiceEnabled;
  voiceToggle.textContent = state.voiceEnabled ? 'Voice on' : 'Voice off';
  if (!state.voiceEnabled) {
    window.speechSynthesis.cancel();
  } else {
    speak(scenes[state.currentScene].line);
  }
});

updateMeters();
renderScene();
