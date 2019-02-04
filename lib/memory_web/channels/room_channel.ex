defmodule MemoryWeb.RoomChannel do
  use MemoryWeb, :channel
  
  alias Memory.Room

  def join("room:" <> name, payload, socket) do
    if authorized?(payload) do
      room = Room.new()
      socket = socket
      |> assign(:room, room)
      |> assign(:name, name)
      {:ok, %{"join" => name, "room" => Room.client_view(room)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  def handle_in("ping", payload, socket) do
    {:reply, {:ok, payload}, socket}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (room:lobby).
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
