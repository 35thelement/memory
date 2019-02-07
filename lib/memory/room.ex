defmodule Memory.Room do
  # Return a new board.
  def init_board do
    # These are the letters that will be used in the
    letters = ["A", "B", "C", "D", "E", "F", "G", "H"]
    letters ++ letters
    |> Enum.shuffle()
    |> Enum.map(fn ltr -> %{letter: ltr, selected: false, matched: false, displayed: false} end)
  end

  # Create a new room.
  def new do
    %{
      board: init_board(),
      clicks: 0,
      score: 0,
    }
  end

  # Render an element of the board for the client state.
  def render_element(el) do
    if el.displayed do
      %{letter: el.letter, revealed: el.displayed, matched: el.matched}
    else
      %{letter: "?", revealed: el.displayed, matched: el.matched}
    end
  end

  # Create the client state.
  def client_view(room) do
    # Render all elements in the room's board.
    b = room.board
    |> Enum.map(fn el -> render_element(el) end)
    |> Enum.chunk_every(4)

    # Return the room's rendered board, clicks, and score.
    %{
      board: b,
      clicks: room.clicks,
      score: room.score
    }
  end

  # Reveal the letter of a card.
  def display(room, r, c) do
    # The index of the card in our state.
    index = 4 * r + c

    # Create a new value equal to the value at the specified index of the board,
    # but set displayed to true.
    displayVal = room.board
    |> Enum.at(index)
    |> Map.put(:displayed, true)

    # Create a new board wherein the value at the specified index is replaced
    # with the new value.
    displayBoard = room.board
    |> List.replace_at(index, displayVal)

    # Update the room's board with the new board.
    room
    |> Map.put(:board, displayBoard)
  end

  # All of the values in an empty List are matched.
  def allMatched([]) do
    true
  end

  # Deterine if the values in a List are matched.
  def allMatched([head | tail]) do
    # If the head is not matched, not all of the values are matched.
    if !head.matched do
      false
    # Otherwise, keep looking.
    else
      allMatched(tail)
    end
  end

  # Check to see if the room's game is over.
  def gameOver?(room, newBoard, newClicks) do
    # Make a new room with the updated board and clicks.
    newRoom = room
    |> Map.put(:board, newBoard)
    |> Map.put(:clicks, newClicks)

    # If all cards are matched in the new board,
    if allMatched(newBoard) do
      # Update the score and return the room with the updated score.
      finalScore = 100 - (newClicks - 16)
      newRoom
      |> Map.put(:score, finalScore)
    # If not, just return the room.
    else
      newRoom
    end
  end

  # There are no values to examine whether they are selected, so we return -1.
  def findSelected(_room, [], _idx) do
    -1
  end

  # Determine the index of the selected card in a List.
  def findSelected(room, [head | tail], idx) do
    # If we found the selected card, return the index.
    if head.selected do
      idx
    # Otherwise, increment index and keep searching.
    else
      findSelected(room, tail, idx + 1)
    end
  end

  # Select the card at the specified index.
  def select(room, index) do
    room.board
    |> Enum.at(index)
    |> Map.put(:selected, true)
    |> Map.put(:displayed, true)
  end

  # Indicate that the card at the specified index is matched.
  def match(room, index) do
    room.board
    |> Enum.at(index)
    |> Map.put(:selected, false)
    |> Map.put(:matched, true)
    |> Map.put(:displayed, false)
  end

  # Indicate that the card at the specified index is not matched.
  def unmatch(room, index) do
    room.board
    |> Enum.at(index)
    |> Map.put(:selected, false)
    |> Map.put(:matched, false)
    |> Map.put(:displayed, false)
  end

  # Choose a card from the board.
  def choose(room, r, c) do
    # Increment the clicks.
    newClicks = room.clicks + 1
    # Get the index of the previously selected card.
    selectedIndex = findSelected(room, room.board, 0)
    # Set the index of the card we're choosing.
    index = 4 * r + c
    # If no cards have been previously selected,
    if selectedIndex === -1 do
      # Create a new value selecting the card at index.
      newVal = select(room, index)
      # Update the board with the new value.
      newBoard = room.board
      |> List.replace_at(index, newVal)
      # Check to see if the game is over.
      gameOver?(room, newBoard, newClicks)
    # If a card was previously selected,
    else
      # If the card we just chose matches the previously selected card,
      if Enum.at(room.board, selectedIndex).letter == Enum.at(room.board, index).letter do
        # Match the two cards.
        matched1 = match(room, index)
        matched2 = match(room, selectedIndex)
        # Update the board with the new values.
        newBoard = room.board
        |> List.replace_at(index, matched1)
        |> List.replace_at(selectedIndex, matched2)
        # Check to see if the game is over.
        gameOver?(room, newBoard, newClicks)
      # If they don't match,
      else
        # Unmatch the two cards.
        unmatched1 = unmatch(room, index)
        unmatched2 = unmatch(room, selectedIndex)
        # Update the board with the new values.
        newBoard = room.board
        |> List.replace_at(index, unmatched1)
        |> List.replace_at(selectedIndex, unmatched2)
        # Check to see if the game is over.
        gameOver?(room, newBoard, newClicks)
      end
    end
  end
end
