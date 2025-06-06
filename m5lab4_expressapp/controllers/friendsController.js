let friends = require("../models/friends");

const getAllFriends = (req, res) => {
    res.json(friends);
};

const filterFriends = (req, res) => {
    console.log(req.query);
    let filterGender = req.query.gender;
    let filterLetter = req.query.letter;
    let matchingFriends = [...friends];

    const validGenders = ["male", "female"];
    if (filterGender && !validGenders.includes(filterGender.toLowerCase())) {
        return res.status(400).json({ error: `Invalid gender. Must be 'male' or 'female'.` });
    }

    if (filterLetter && (filterLetter.length !== 1 || !/^[a-z]$/i.test(filterLetter))) {
        return res.status(400).json({ error: `Invalid letter. Must be a single alphabet character.` });
    }

    if (filterGender) {
        matchingFriends = matchingFriends.filter((friend) => friend.gender == filterGender);
    }

    if (filterLetter) {
        matchingFriends = matchingFriends.filter((friend) => friend.name && friend.name[0].toLowerCase() === filterLetter.toLowerCase());
    }

    if (matchingFriends.length > 0) {
        res.status(200).json(matchingFriends);
    } else {
        res.status(404).json({
            error: `No friends matching${filterGender ? " gender " + filterGender : ""}${
                filterLetter ? " and starting with letter " + filterLetter : ""
            }`,
        });
    }
};

const getFriendById = (req, res) => {
    console.log(req.params);
    const friendId = parseInt(req.params.id);

    if (isNaN(friendId)) {
        return res.status(400).json({ error: "Invalid ID. Must be a number." });
    }

    const friendIdMatch = friends.find((friend) => friend.id === friendId);
    if (friendIdMatch) {
        res.json(friendIdMatch);
    } else {
        res.status(404).json({ error: "Friend not found" });
    }
};
const getHeaderInfo = (req, res) => {
    console.log(req.headers);
    const { "user-agent": userAgent, "content-type": contentType, accept } = req.headers;

    const headerInfo = {
        "user-agent": userAgent,
        "content-type": contentType,
        accept: accept,
    };

    res.json(headerInfo);
};

const addFriend = (req, res) => {
    let newFriend = req.body;
    console.log(newFriend);

    if (!newFriend.name || !newFriend.gender) {
        res.status(500).json({ error: "Friend object must contain a name and gender" });
        return;
    } else if (!newFriend.id) {
        newFriend.id = friends.length + 1;
    }

    friends.push(newFriend);
    res.status(200).json(newFriend);
};

const updateFriend = (req, res) => {
    const friendId = parseInt(req.params.id);
    const updatedFriend = req.body;

    if (isNaN(friendId)) {
        return res.status(400).json({ error: "Invalid ID in URL. Must be a number." });
    }

    const index = friends.findIndex((friend) => friend.id === friendId);

    if (index !== -1) {
        friends[index] = { ...friends[index], ...updatedFriend, id: friendId };

        res.json({
            result: `Updated friend with ID ${friendId}`,
            data: friends[index],
        });
    } else {
        res.status(404).json({
            error: `Friend not found with ID ${friendId}`,
        });
    }
};

const deleteFriend = (req, res) => {
    const friendId = parseInt(req.params.id);
    if (isNaN(friendId)) {
        return res.status(400).json({ error: "Invalid ID in URL. Must be a number." });
    }

    const index = friends.findIndex((friend) => friend.id === friendId);

    if (index !== -1) {
        const deletedFriend = friends.splice(index, 1)[0];
        res.json({ result: `Deleted friend with ID ${friendId}`, data: deletedFriend });
    } else {
        res.status(404).json({ error: `Friend not found with ID ${friendId}` });
    }
};

module.exports = {
    getAllFriends,
    getFriendById,
    filterFriends,
    getHeaderInfo,
    addFriend,
    updateFriend,
    deleteFriend,
};
