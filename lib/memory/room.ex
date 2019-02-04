defmodule Memory.Room do
  def init_board do
    letters = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"]
    |> Enum.take_random(16)
    |> List.to_tuple()
    [
      [
        %{
          letter: elem(letters, 0),
          selected: false,
          matched: false
        },
        %{
          letter: elem(letters, 1),
          selected: false,
          matched: false
        },
        %{
          letter: elem(letters, 2),
          selected: false,
          matched: false
        },
        %{
          letter: elem(letters, 3),
          selected: false,
          matched: false
        }
      ],
      [
        %{
          letter: elem(letters, 4),
          selected: false,
          matched: false
        },
        %{
          letter: elem(letters, 5),
          selected: false,
          matched: false
        },
        %{
          letter: elem(letters, 6),
          selected: false,
          matched: false
        },
        %{
          letter: elem(letters, 7),
          selected: false,
          matched: false
        }
      ],
      [
        %{
          letter: elem(letters, 8),
          selected: false,
          matched: false
        },
        %{
          letter: elem(letters, 9),
          selected: false,
          matched: false
        },
        %{
          letter: elem(letters, 10),
          selected: false,
          matched: false
        },
        %{
          letter: elem(letters, 11),
          selected: false,
          matched: false
        }
      ],
      [
        %{
          letter: elem(letters, 12),
          selected: false,
          matched: false
        },
        %{
          letter: elem(letters, 13),
          selected: false,
          matched: false
        },
        %{
          letter: elem(letters, 14),
          selected: false,
          matched: false
        },
        %{
          letter: elem(letters, 15),
          selected: false,
          matched: false
        }
      ]
    ]
  end

  def new do
    %{
      board: init_board(),
      clicks: 0,
      score: 0,
    }
  end

  def client_view(room) do
    b = room.board

    %{
      board: b
    }
  end
end
