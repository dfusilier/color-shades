
const suggestColor = ({
  manipulation,
  predicate,
  target,
  tolerance = 0.005,
  targetIsMin = false,
}) => {
  const startColor = manipulation(0);

  // If the target is meant to be a minimum, we want to first
  // check if the start color already meets the minimum.
  const initialContrast = predicate(startColor);

  if (targetIsMin) {
    // If it does, we return it. If it doesn't, we want to tweak
    // the start color the minimum amount to make it pass. That
    // means we can just proceed as if it targetIsMin = false.

    if (initialContrast >= target) {
      return startColor;
    }
  } else {
    if (initialContrast === target) {
      return startColor;
    }
  }

  const goalIsIncrease = initialContrast < target ? true : false;

  // Recursive binary search function to determine what amount of
  // "change" results in a color that is within the tolerance range
  // of the target.

  // Make a guess and evaluate it
  const makeGuess = change => {
    // Manipulate the color
    const resultColor = manipulation(change);

    // Measure the success of the result
    const contrast = predicate(resultColor);

    // Measure distance of resulting contrast from target
    const loss = contrast - target;

    // Is the loss is greater than zero and within tolerance? If so, it's a winner.
    const isWinner = loss >= 0 && loss <= tolerance;

    return { color: resultColor, change, contrast, loss, isWinner };
  };

  const findWinner = (
    // Upper and lower bounds of the what we'll guess. Because we
    // don't know direction of the solution, we'll use these to run
    // two binary searches with +/- the upper bound.
    changeLowerBound = 0,
    changeUpperBound = 100,
    iteration = 0,
  ) => {
    const changeMedian = (changeLowerBound + changeUpperBound) / 2;
    const guessWithMedian = makeGuess(changeMedian);
    const currentContrast = guessWithMedian.contrast;

    if (iteration >= 50) {
      return undefined;
    } else if (guessWithMedian.isWinner) {
      return guessWithMedian;
    } else if (currentContrast >= target && goalIsIncrease) {
      return findWinner(changeLowerBound, changeMedian, iteration + 1);
    } else if (currentContrast < target && goalIsIncrease) {
      return findWinner(changeMedian, changeUpperBound, iteration + 1);
    } else if (currentContrast >= target && !goalIsIncrease) {
      return findWinner(changeMedian, changeUpperBound, iteration + 1);
    } else if (currentContrast < target && !goalIsIncrease) {
      return findWinner(changeLowerBound, changeMedian, iteration + 1);
    }

    throw new Error('Something weird is happening in findWinner()!');
  };

  const winner = findWinner();

  return winner?.color;
};

// This function accepts an array of arguments.
// It runs the suggestColor function with each
// set of arguments in order, until it finds a
// suggests a color that returns true when run
// through the matchSuggestion function.
export const suggestColorWithFallbacks = (
  settingsArray,
  matchSuggestion,
  ifNoMatches,
) => {
  const defaultMatchSuggestion = suggestion => suggestion;
  const finalMatchSuggestion = matchSuggestion
    ? matchSuggestion
    : defaultMatchSuggestion;

  for (const settings of settingsArray) {
    const suggestion = suggestColor(settings);
    if (suggestion && finalMatchSuggestion(suggestion)) {
      return suggestion;
    }
  }
  return ifNoMatches ? ifNoMatches() : undefined;
};

// This function accepts an array of arguments.
// and will pass them to suggestColor and return
// all suggestions.
export const suggestColors = settingsArray => {
  const suggestions = settingsArray
    .map(settings => {
      return suggestColor(settings);
    })
    .filter(suggestion => suggestion);

  return suggestions;
};

export default suggestColor;