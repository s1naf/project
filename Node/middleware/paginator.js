const pagination = (model) => {
    return async (req, res, next) => {
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const total = await model.countDocuments();
  
        res.pagination = {
          totalPages: Math.ceil(total / limit),
          currentPage: page,
          limit: limit,
          startIndex: startIndex,
          totalItems: total
        };
  
        next();
      } catch (err) {
        res.status(500).json({ status: false, data: err.message });
      }
    };
  };
  
  module.exports = pagination;