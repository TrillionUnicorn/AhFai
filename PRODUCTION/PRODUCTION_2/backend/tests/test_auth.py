"""Authentication tests."""
import pytest


def test_register_user(client, test_user_data):
    """Test user registration."""
    response = client.post("/api/auth/register", json=test_user_data)
    assert response.status_code == 201
    data = response.json()
    assert data["email"] == test_user_data["email"]
    assert data["name"] == test_user_data["name"]
    assert "id" in data


def test_register_duplicate_email(client, test_user_data):
    """Test registration with duplicate email."""
    client.post("/api/auth/register", json=test_user_data)
    response = client.post("/api/auth/register", json=test_user_data)
    assert response.status_code == 400


def test_register_invalid_password(client):
    """Test registration with invalid password."""
    response = client.post("/api/auth/register", json={
        "name": "Test User",
        "email": "test@example.com",
        "password": "weak"
    })
    assert response.status_code == 422


def test_login_success(client, test_user_data):
    """Test successful login."""
    client.post("/api/auth/register", json=test_user_data)
    response = client.post("/api/auth/login", json={
        "email": test_user_data["email"],
        "password": test_user_data["password"]
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_wrong_password(client, test_user_data):
    """Test login with wrong password."""
    client.post("/api/auth/register", json=test_user_data)
    response = client.post("/api/auth/login", json={
        "email": test_user_data["email"],
        "password": "WrongPass123"
    })
    assert response.status_code == 401


def test_login_nonexistent_user(client):
    """Test login with nonexistent user."""
    response = client.post("/api/auth/login", json={
        "email": "nonexistent@example.com",
        "password": "TestPass123"
    })
    assert response.status_code == 401
