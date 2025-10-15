"""Notes tests."""
import pytest


def test_create_note(authenticated_client):
    """Test creating a note."""
    response = authenticated_client.post("/api/notes", json={
        "title": "Test Note",
        "content": "This is a test note."
    })
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Test Note"
    assert data["content"] == "This is a test note."
    assert "id" in data


def test_list_notes(authenticated_client):
    """Test listing notes."""
    # Create some notes
    authenticated_client.post("/api/notes", json={
        "title": "Note 1",
        "content": "Content 1"
    })
    authenticated_client.post("/api/notes", json={
        "title": "Note 2",
        "content": "Content 2"
    })
    
    response = authenticated_client.get("/api/notes")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2


def test_get_note(authenticated_client):
    """Test getting a specific note."""
    create_response = authenticated_client.post("/api/notes", json={
        "title": "Test Note",
        "content": "Test Content"
    })
    note_id = create_response.json()["id"]
    
    response = authenticated_client.get(f"/api/notes/{note_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Note"


def test_update_note(authenticated_client):
    """Test updating a note."""
    create_response = authenticated_client.post("/api/notes", json={
        "title": "Original Title",
        "content": "Original Content"
    })
    note_id = create_response.json()["id"]
    
    response = authenticated_client.patch(f"/api/notes/{note_id}", json={
        "title": "Updated Title",
        "content": "Updated Content"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Updated Title"
    assert data["content"] == "Updated Content"


def test_delete_note(authenticated_client):
    """Test deleting a note."""
    create_response = authenticated_client.post("/api/notes", json={
        "title": "Test Note",
        "content": "Test Content"
    })
    note_id = create_response.json()["id"]
    
    response = authenticated_client.delete(f"/api/notes/{note_id}")
    assert response.status_code == 204
    
    # Verify note is deleted
    get_response = authenticated_client.get(f"/api/notes/{note_id}")
    assert get_response.status_code == 404


def test_search_notes(authenticated_client):
    """Test searching notes."""
    authenticated_client.post("/api/notes", json={
        "title": "Python Tutorial",
        "content": "Learn Python programming"
    })
    authenticated_client.post("/api/notes", json={
        "title": "JavaScript Guide",
        "content": "Learn JavaScript"
    })
    
    response = authenticated_client.get("/api/notes?search=Python")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert "Python" in data[0]["title"]


def test_unauthorized_access(client):
    """Test accessing notes without authentication."""
    response = client.get("/api/notes")
    assert response.status_code == 401
