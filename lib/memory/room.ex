defmodule Memory.Room do
  def init_board do
    letters = ["A", "B", "C", "D", "E", "F", "G", "H"]
    letters ++ letters
    |> Enum.shuffle()
    |> Enum.map(fn ltr -> %{letter: ltr, selected: false, matched: false, displayed: false} end)
  end

  def new do
    %{
      board: init_board(),
      clicks: 0,
      score: 0,
    }
  end

  def render_element(el) do
    if el.displayed do
      %{letter: el.letter, revealed: el.displayed, matched: el.matched}
    else
      %{letter: "?", revealed: el.displayed, matched: el.matched}
    end
  end

  def client_view(room) do
    b = room.board
    |> Enum.map(fn el -> render_element(el) end)
    |> Enum.chunk_every(4)

    %{
      board: b,
      clicks: room.clicks,
      score: room.score
    }
  end

  def display(room, r, c) do
    index = 4 * r + c

    displayVal = room.board
    |> Enum.at(index)
    |> Map.put(:displayed, true)

    displayBoard = room.board
    |> List.replace_at(index, displayVal)

    room
    |> Map.put(:board, displayBoard)
  end

  def allMatched([]) do
    true
  end

  def allMatched([head | tail]) do
    if !head.matched do
      false
    else
      allMatched(tail)
    end
  end

  def gameOver?(room, newBoard, newClicks) do
    newRoom = room
    |> Map.put(:board, newBoard)
    |> Map.put(:clicks, newClicks)

    if allMatched(newBoard) do
      finalScore = 100 - (newClicks - 16)
      newRoom
      |> Map.put(:score, finalScore)
    else
      newRoom
    end
  end

  def findSelected(_room, [], _idx) do
    -1
  end

  def findSelected(room, [head | tail], idx) do
    if head.selected do
      idx
    else
      findSelected(room, tail, idx + 1)
    end
  end

  def select(room, index) do
    room.board
    |> Enum.at(index)
    |> Map.put(:selected, true)
    |> Map.put(:displayed, true)
  end

  def match(room, index) do
    room.board
    |> Enum.at(index)
    |> Map.put(:selected, false)
    |> Map.put(:matched, true)
    |> Map.put(:displayed, false)
  end

  def unmatch(room, index) do
    room.board
    |> Enum.at(index)
    |> Map.put(:selected, false)
    |> Map.put(:matched, false)
    |> Map.put(:displayed, false)
  end

  def choose(room, r, c) do
    newClicks = room.clicks + 1
    selectedIndex = findSelected(room, room.board, 0)

    index = 4 * r + c

    if selectedIndex === -1 do
      newVal = select(room, index)

      newBoard = room.board
      |> List.replace_at(index, newVal)

      gameOver?(room, newBoard, newClicks)
    else
      if Enum.at(room.board, selectedIndex).letter == Enum.at(room.board, index).letter do
        matched1 = match(room, index)
        matched2 = match(room, selectedIndex)

        newBoard = room.board
        |> List.replace_at(index, matched1)
        |> List.replace_at(selectedIndex, matched2)

        gameOver?(room, newBoard, newClicks)
      else
        unmatched1 = unmatch(room, index)
        unmatched2 = unmatch(room, selectedIndex)

        newBoard = room.board
        |> List.replace_at(index, unmatched1)
        |> List.replace_at(selectedIndex, unmatched2)

        gameOver?(room, newBoard, newClicks)
      end
    end
  end
end
